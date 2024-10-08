import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductService from "../product-service/ProductService";
import Swal from "sweetalert2";
import NavBar from "../navbar/Navbar";
import { loadStripe } from "@stripe/stripe-js"; // Ensure Stripe is installed
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"; // Ensure Stripe is installed

const stripePromise = loadStripe("pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"); // Replace with your Stripe publishable key

const PlaceOrder = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [cardError, setCardError] = useState(null);
  const [loading, setLoading] = useState(false);

  const stripe = useStripe(); // Get Stripe instance
  const elements = useElements(); // Get elements instance

  useEffect(() => {
    ProductService.getProductDetails(id)
      .then((response) => {
        console.log("response from get", response);
        setProduct(response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [id]);

  const user = sessionStorage.getItem("username");

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!product) {
      console.error("Product details not available");
      return;
    }

    const { status, quantity } = values;
    const totalAmount = product.price * quantity;

    const orderData = {
      username: user,
      status,
      totalAmount,
      orderItems: [
        {
          productId: id,
          quantity,
          price: product.price,
        },
      ],
    };

    const authToken = sessionStorage.getItem("token");

    const headers = {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    };

    try {
      // Create Payment Method
      const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (paymentError) {
        setCardError(paymentError.message);
        setSubmitting(false);
        return;
      }

      // Include paymentMethod.id in the order request
      const response = await axios.post(
        "http://192.168.1.12:8081/api/orders",
        { ...orderData, paymentMethodId: paymentMethod.id }, // Send payment method ID
        { headers: headers }
      );

      console.log("Order created:", response.data);
      Swal.fire({
        title: "Order Place Successful",
        icon: "success",
        timer: 1500,
      });
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-row h-screen">
        <div
          className="flex-grow bg-white p-8 rounded-lg shadow-md"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <h2 className="text-2xl font-bold" style={{ marginBottom: "20px" }}>
              Place Order
            </h2>
            <Formik
              initialValues={{
                username: user,
                status: "",
                quantity: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ values, isSubmitting }) => (
                <Form className="space-y-4">
                  <Field type="hidden" name="username" />

                  <Field as="select" name="status" className="border p-2 rounded-md w-full">
                    <option value="">Select Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </Field>
                  <Field
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    className="border p-2 rounded-md w-full"
                  />

                  {product && (
                    <p className="text-gray-700">
                      Price: ${product.price} Total: ${product.price * values.quantity}
                    </p>
                  )}

                  {/* Step 1: Add CardElement for Stripe payment */}
                  <CardElement className="border p-2 rounded-md w-full" />

                  {cardError && <div className="text-red-500">{cardError}</div>}

                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? "Processing..." : "Order"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
