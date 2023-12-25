import axios from 'axios';
import React, { useState } from 'react'

function Signup() {
    const [userInfo, setUserInfo] = useState({
        name :'',
        username: '',
        email: '',
        password: '',
        roles :'ROLE_USER',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8083/auth/addNewUser', userInfo);
            window.history.back();

        } catch (error) {
            console.error('Erro to register  user :', error)
        }
    };

  
    return (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white p-4 rounded-md shadow-md w-[400px] h-[400px]">
            <h1 className="text-3xl font-bold mb-4 text-center">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col max-w-md">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={userInfo.name}
                onChange={handleChange}
                className="border rounded-md p-2 mb-4"
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={userInfo.username}
                onChange={handleChange}
                className="border rounded-md p-2 mb-4"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={handleChange}
                className="border rounded-md p-2 mb-4"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userInfo.password}
                onChange={handleChange}
                className="border rounded-md p-2 mb-4"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Sign Up
              </button>
              {/* Show error message */}
            </form>
          </div>
        </div>
      );
    };
    
  


export default Signup
