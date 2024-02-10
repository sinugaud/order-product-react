import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserProfile from '../profile/UserProfile';

function Navigation() {
  return (
    <ul className="flex space-x-4">
      <li className="text-gray-700  px-4 py-2">
        Dashboard
      </li>
      <li className="text-gray-300  px-4 py-2">
        <Link to={`/`} className="text-gray-700 hover:text-black px-4 py-2">
          Products
        </Link>
      </li>
      <li className="text-gray-300 px-4 py-2">
        <Link to={`/orders`} className="text-gray-700 hover:text-black px-4 py-2">
          Orders
        </Link>
      </li>
      <li className="text-gray-300  px-4 py-2">
        <Link to={`/sign-up`} className="text-gray-700 hover:text-black px-4 py-2">
          Signup
        </Link>
      </li>
    </ul>
  );
}


function NavBar() {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    const authToken = sessionStorage.getItem('token');

    try {
      setLoggingOut(true);

      const headers = {
        Authorization:"Bearer "+ authToken,
        'Content-Type': 'application/json',
      };

      await axios.post('http://localhost:8083/auth/logout', {}, { headers });

      sessionStorage.removeItem('token');

      setTimeout(() => {
        setLoggingOut(false);
        window.location.href = '/'; // Redirect if needed
      }, 1500); // Adjust the time according to your preference
    } catch (error) {
      console.error('Error:', error);
      setLoggingOut(false); 
    }
  

  };


  return (
    <div className="flex">
      <div className="flex-grow">
        <header className="bg-white shadow flex items-center justify-between px-4 py-3">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            E-Commerce
          </h1>

          <Navigation />

          {  (
            <UserProfile handleLogout={handleLogout} loggingOut={loggingOut} />
          )}
        </header>
      </div>
    </div>
  );
}

export default NavBar;
