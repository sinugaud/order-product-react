import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../navbar/Navbar";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const authToken = sessionStorage.getItem('token');
  const headers = {
    Authorization: "Bearer " + authToken,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    axios
      .get("http://192.168.1.12:8085/api/orders", { headers })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [authToken]);

  return (
    <div className="p-4 mt-8">
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default OrderList;
