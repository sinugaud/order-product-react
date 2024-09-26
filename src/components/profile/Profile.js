import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../navbar/Navbar";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const authToken = sessionStorage.getItem("token");

    const headers = {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    };
    console.log("auth token", authToken);

    axios
      .get("http://localhost:8083/admin/profile", {
        headers: headers,
      })
      .then((response) => {
        setUser(response.data);
        console.log("Response:", response);
      })

      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
    console.log("header", headers);
  }, []);

  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-8">
        <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:w-48"
                src={user.displayPicture}
                alt="User Display"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {user.roles}
              </div>
              <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
                {user.name}
              </h2>
              <p className="mt-2 text-gray-500">{user.email}</p>
              <p className="mt-2 text-gray-600">Username: {user.username}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
