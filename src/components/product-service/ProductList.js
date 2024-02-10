import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/products")
      .then((response) => {
        setProducts(response.data);
        console.log("Response:", response);
        const authToken = sessionStorage.getItem("token");
        setToken(authToken || "");
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const getorder = (id) => {
    navigate(`/place-order/${id}`);
  };

  return (
    <div className="flex">
      <div className="flex flex-col w-full">
        <NavBar />
        <div className="flex-grow flex justify-center items-center p-4">
          <div className="w-full max-w-4xl">
            <h1 className="text-3xl font-bold mb-4">Product List</h1>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <li key={product.id} className="rounded-md shadow-md p-4 bg-white">
                  <Link key={product.id} to={`/product-detail/${product.id}`} className="flex flex-col h-full">
                    <img
                      src={product.imageuri}
                      alt={product.name}
                      className="object-cover h-40 w-full mb-4 rounded-md"
                    />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">Description: {product.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">Price: {product.price}</p>
                      <p className="text-gray-600">Quantity: {product.quantity}</p>
                    </div>
                  </Link>
                  <button
                    className="inline-block px-4 py-2 rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 shadow-md mt-4"
                    onClick={() => getorder(product.id)}
                  >
                    Order Now
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
