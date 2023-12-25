import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../navbar/Navbar";

const ProductDetails = ({ onData }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched) {
      axios
        .get(`http://localhost:8082/api/products/${id}`)
        .then((response) => {
          setProduct(response.data);
          if (onData) {
            onData(response.data.name, response.data.price);
          }
          console.log("Product details:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        })
        .finally(() => {
          setFetched(true); 
        });
    }
  }, [id, onData, fetched]);

  return (
    <>
      {/* <div className=" flex-grow"> */}
      {/* <NavBar></NavBar> */}
      <Link to={`/`}>Go back to Product List</Link>
      {/* <div className="w-3/4 p-4"> */}
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        {product ? (
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 text-lg mb-2">Description: {product.description}</p>
            <p className="text-gray-600 text-lg mb-2">Price: ${product.price}</p>
            <p className="text-gray-600 text-lg">Quantity: {product.quantity}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {/* </div> */}
        {/* </div> */}
    </>
  );
};

export default ProductDetails;
