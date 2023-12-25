import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductDetails from "../product-service/ProductDetails";
import ProductService from "../product-service/ProductService";
import Swal from "sweetalert2";
import NavBar from "../navbar/Navbar";

const OrderService = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState("");

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
  const user =sessionStorage.getItem('username');


  const handleSubmit = async (values) => {
    
    if (!product) {
      console.error("Product details not available");
      return;
    }

    const { username, status, quantity } = values;
    const totalAmount = product.price * quantity;
    console.log("logged username = ",username)

    const orderData = {
      username,
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

    const authToken = sessionStorage.getItem('token');

    const headers = {
      Authorization:"Bearer "+ authToken,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/api/orders", orderData, { headers: headers }
      );
      console.log("Order created:", response.data);
      Swal.fire({
        title: 'Order Place Successful',
        icon: 'success',
        timer: 1500
    });
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="flex">
      <NavBar></NavBar>
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 h-screen p-4">
        <ProductDetails onData={(name, price) => setProduct({ name, price })}></ProductDetails>
      </div>

      {/* Main Content */}
      <div className="w-3/4 bg-gray-200 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">place Order</h2>
          <Formik
            initialValues={{
              username: user,
              status: "",
              quantity: "",
            }}
            onSubmit={handleSubmit}
          >

{({ values }) => (
                  <Form className="space-y-4">
                <Field
                  type="hidden"
                      // type="text"
                      name="username"
                      placeholder="User name"
                      className="border p-2 rounded-md w-full"
                    />
              
                    <Field
                      as="select"
                      name="status"
                      className="border p-2 rounded-md w-full"
                    >
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
                        Price: ${product.price} Total: $
                        {product.price * values.quantity}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                    >
                       Order
                    </button>
                  </Form>
                )}


          </Formik>
        </div>
      </div>
    </div>
  );
};

export default OrderService;
