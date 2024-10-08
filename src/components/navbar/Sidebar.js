import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [loggingOut, setLoggingOut] = useState(false); // State to manage logout loading state

  const handleLogout = async (e) => {
    e.preventDefault();
    const authToken = sessionStorage.getItem('token');
    console.log("authToken", authToken);

    try {
      setLoggingOut(true); // Set logging out state to true

      const headers = {
        Authorization: authToken,
        'Content-Type': 'application/json',
      };

      await axios.post('http://192.168.1.12:8085', {}, { headers });

      sessionStorage.removeItem('token');
      // Simulate a slight delay for effect
      setTimeout(() => {
        setLoggingOut(false); // Reset logging out state after some time
        window.location.href = '/'; // Redirect to the homepage or login after logout
      }, 1500); // Adjust the time according to your preference
    } catch (error) {
      console.error('Error:', error);
      setLoggingOut(false); // Reset logging out state in case of error
      // Optionally handle errors or show an error message to the user
    }
  };

  return (
    <div className="bg-gray-800 w-60 h-screen fixed overflow-y-auto">
      {/* Sidebar content */}
      <ul className="mt-10">
        <li className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2">
          Dashboard
        </li>
        <li className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2">
          <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2">
            Products
          </Link>
        </li>
        <li className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2">
          <Link to="/orders" className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2">
            Orders
          </Link>
        </li>
        <li className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2">
          <Link to="/sign-up" className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2">
            Signup
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2"
            disabled={loggingOut}
          >
            {loggingOut ? 'Logging Out...' : 'Logout'}
          </button>
        </li>
        {/* Add more sidebar items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
