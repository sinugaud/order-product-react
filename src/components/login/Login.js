import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.1.12:8085/api/auth/login",
        {
          username: username,
          password: password,
        }
      );

      console.log("response", response.data);
      console.log("response token", response.data.token);

      const authToken = response.data.token;
      sessionStorage.setItem("token", authToken);
      sessionStorage.setItem("username", username);

      // Show success message using Swal
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        timer: 1500,
      });

      // Redirect after successful login
      // window.history.back();
      navigate({ pathname: "/" }, { replace: true });
    } catch (error) {
      console.error("Error:", error);
      setError("Invalid username or password");
    }

    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (token && token?.length > 0) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      {/* <div className="bg-white p-4 rounded-md shadow-lg w-[525px] h-[350px]"> */}
      <form onSubmit={handleLogin} className="flex flex-col max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-md p-2 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-md p-2 mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
