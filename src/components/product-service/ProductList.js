import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../cart/Cart"; // Import the Cart component
import AddToCart from "../cart/AddToCart";

const ProductList = () => {
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // State for cart
  const navigate = useNavigate();

  console.log("cart",cart)
  async function getproductlist() {
    console.log(new Date().getTime());
    axios
      .get("http://192.168.1.12:8085/api/products")
      .then((response) => {
        setProducts(response.data);
        console.log("Response:", response);
        const authToken = sessionStorage.getItem("token");
        setToken(authToken || "");
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  useEffect(() => {
    getproductlist();
  }, []);

  // Add product to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove product from the cart
  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (product, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(product);
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Calculate total price of all items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Function to handle placing the order
  const placeOrder = () => {
    console.log("Order placed:", cart);
    // Redirect after order placement
    navigate(`/place-order`); 
  };

  const getorder = (id) => {
    navigate(`/place-order/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center">
        <div className="max-w-4xl w-full p-4">
          <h1 className="text-3xl font-bold mb-4">Product List</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-md shadow-md overflow-hidden bg-white"
              >
                <Link to={`/product-detail/${product.id}`}>
                  <img
                    src={product.imageuri}
                    alt={product.name}
                    className="object-cover w-full h-48"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Description: {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600">Price: ${product.price}</p>
                      <p className="text-gray-600">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                  </div>
                </Link>
                <button
                  className="w-full py-2 rounded-b-md font-semibold text-white bg-blue-500 hover:bg-blue-600"
                  onClick={() => addToCart(product)} // Add to cart on button click
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Cart Section */}
          
        </div>
      </div>
    </>
  );
};

export default ProductList;
