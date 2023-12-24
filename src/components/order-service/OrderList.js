import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../navbar/Navbar";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/orders")
      .then((response) => {
        setOrders(response.data);
        console.log("Response:", response);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div className="flex">
      <div className="bg-gray-800 w-64 overflow-y-auto flex-shrink-0">
        <NavBar />
      </div>

      <div className="flex flex-grow">
        <div className="flex-grow p-4">
          <h2 className="text-2xl font-bold mb-4">Orders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
            <Link key={order.id} to={`/order-detail/${order.id}`} className="order-item">
            <div className="rounded-md shadow-md p-4 bg-white flex flex-col cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Order ID: {order.id}
              </h3>
              <p className="text-gray-600">Username: {order.username}</p>
              <p className="text-gray-600">Date: {order.date}</p>
              <p className="text-gray-600">Status: {order.status}</p>
              <p className="text-gray-600">Total Amount: ${order.totalAmount}</p>
              {/* Additional order details can be added here */}
            </div>
          </Link>
          
            ))}
          </div>
          <Link to={`/orders`} className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2">
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
