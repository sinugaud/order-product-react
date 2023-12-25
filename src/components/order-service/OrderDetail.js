import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../navbar/Navbar";
import { NavbarWithSearch } from "../navbar/NavbarWithSearch";

const OrderDetails = ({ onData }) => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const authToken = sessionStorage.getItem('token');
  const headers = {
    Authorization:"Bearer "+ authToken,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/orders/${id}`  ,{ headers: headers })
      .then((response) => {
        setOrder(response.data);
        if (onData) {
          onData(response.data.status, response.data.price);
        }
        console.log("Order details:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  }, [id, onData]);

  return (
    // <div className="flex">
    //   {/* // <div className="bg-gray-800 w-64 overflow-y-auto flex-shrink-0"> */}
        // <NavBar />
    //   <div className="d-3/2 p-13">
    //     <h2 className="text-2x1 font-bold mb-2">Order Details</h2>
    //     {order ? (
    //       <div className="bg-gray-200 rounded-lg p-16">
    //         <p className="text-gray-600 mb-4">User name: {order.username}</p>
    //         <p className="text-gray-600 mb-4">Date: {order.date}</p>
    //         <p className="text-gray-600 mb-4">Status: {order.status}</p>
    //         <p className="text-gray-600 mb-4">
    //           Total Amount: ${order.totalAmount}
    //         </p>
    //       </div>
    //     ) : (
    //       <p>Loading...</p>
    //     )}
    //   </div>
    //   </div>
    //   // </div>
    // <div className="flex ">
<>
    <NavBar></NavBar>
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white p-8 m-20 rounded-lg shadow-md w-1/1">
          <h2 className="text-3xl font-bold mb-2 text-center">Order Details</h2>
          {order ? (
            <div className="bg-gray-200 rounded-lg p-6">
              <p className="text-gray-600 mb-4">User name: {order.username}</p>
              <p className="text-gray-600 mb-4">Date: {order.date}</p>
              <p className="text-gray-600 mb-4">Status: {order.status}</p>
              <p className="text-gray-600 mb-4">
                Total Amount: ${order.totalAmount}
              </p>
            </div>
          ) : (
            <p className="text-center mt-4">Loading...</p>
          )}
      </div>
      </div>
      </>
      
        
    
      
);
};

export default OrderDetails;
