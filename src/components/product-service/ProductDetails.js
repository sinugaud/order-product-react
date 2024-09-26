import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../navbar/Navbar";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ProductDetails = ({ onData }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [fetched, setFetched] = useState(false);
  const navigate = useNavigate();

  

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
  const getorder = (id) => {
    navigate(`/place-order/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {product ? (
          <>
            <div className="lg:col-span-1 order-last lg:order-first">
            <div className="lg:col-span-1 order-last lg:order-first flex items-center justify-start">
              <Link to={`/`} className="flex items-center">
                <KeyboardBackspaceIcon />
              </Link>
            </div>

              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={product.imageuri}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="lg:col-span-1 lg:order-last">
              <h2 className="text-2xl font-bold mb-4">Product Details</h2>
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-lg mb-2">Description: {product.description}</p>
              <p className="text-gray-600 text-lg mb-2">Price: ${product.price}</p>
              <p className="text-gray-600 text-lg">Quantity: {product.quantity}</p>
              <button
                className="w-full py-2 rounded-b-md font-semibold text-white bg-blue-500 hover:bg-blue-600"
                onClick={() => getorder(product.id)}
              >
                Order Now
              </button>
            </div>
          </>
          
        ) : (
          <p>Loading...</p>
        )}
                      
      </div>
    </>
  );
};

export default ProductDetails;
