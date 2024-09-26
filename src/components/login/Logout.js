import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UserProfile from "../profile/UserProfile";

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
         "http://localhost:8083/api/auth/logout",
         {},
         Swal.fire({
           title: "Logout  Successful",
           icon: "success",
           timer: 1500,
         }),
         { headers }
       );

       sessionStorage.removeItem("token");

       setTimeout(() => {
         setLoggingOut(false);
         window.location.href = "/"; // Redirect if needed
       }, 1500); // Adjust the time according to your preference
     } catch (error) {
       console.error("Error:", error);
       setLoggingOut(false);
     }
   };


    return (
                  <UserProfile handleLogout={handleLogout} loggingOut={loggingOut} />

    // <div className="flex items-center justify-center h-screen">
    //   <button onClickCapture={handleLogout}>Logout User</button>
    // </div>
  );
}

export default Logout;
