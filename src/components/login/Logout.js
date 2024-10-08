import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Logout() {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    const authToken = sessionStorage.getItem("token");

    try {
      setLoggingOut(true);

      const headers = {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      };

      await axios.post(
        "http://192.168.1.12:8085/api/auth/logout",
        {}, // Empty body for logout
        { headers } // Correct placement for headers
      );

      Swal.fire({
        title: "Logout Successful",
        icon: "success",
        timer: 1500,
      });

      sessionStorage.removeItem("token");

      setTimeout(() => {
        setLoggingOut(false);
        window.location.href = "/"; // Redirect after logout
      }, 1500); // Adjust the delay as per your need
    } catch (error) {
      console.error("Error:", error);
      setLoggingOut(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button 
        onClick={handleLogout} 
        disabled={loggingOut} 
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        {loggingOut ? "Logging Out..." : "Sign Out"}
      </button>
    </div>
  );
}

export default Logout;
