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

// function UserProfile({ handleLogout, loggingOut }) {
//   const userNavigation = [
//     { name: 'My Profile', link: '/profile' },
//     { name: 'My Orders', link: '/orders' },
//     { name: 'Sign out', link: '/logout' },
//   ];

//   return (
//     <div className="flex items-center space-x-4">
//       {userNavigation.map((item) => (
//         <a
//           key={item.name}
//           href={item.link}
//           className="text-gray-700 hover:text-black"
//         >
//           {item.name}
//         </a>
//       ))}
//       <button onClick={handleLogout} className="text-gray-700  hover:text-black px-4 py-2" disabled={loggingOut}>
//         {loggingOut ? 'Logging Out...' : 'Logout'}
//       </button>
//     </div>
//   );
// }

function NavBar() {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    const authToken = sessionStorage.getItem('token');
    console.log("authToken",authToken)

    try {
      setLoggingOut(true); // Set logging out state to true

      const headers = {
        Authorization: authToken,
        'Content-Type': 'application/json',
      };

      await axios.post('http://localhost:8083/auth/logout', {}, { headers });

      sessionStorage.removeItem('token');

      setTimeout(() => {
        setLoggingOut(false);
        // Reset logging out state after some time (simulating the logout process)
        // window.location.href = '/'; // Redirect if needed
      }, 1500); // Adjust the time according to your preference
    } catch (error) {
      console.error('Error:', error);
      setLoggingOut(false); // Reset logging out state in case of error
      // Handle errors, maybe show an error message to the user
    }
  

  };

  const [userInfo] = useState({
    name: 'John Doe',
  });

  return (
    <div className="flex">
      <div className="flex-grow">
        <header className="bg-white shadow flex items-center justify-between px-4 py-3">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            E-Commerce
          </h1>

          <Navigation />

          {/* {userInfo && (
            <UserProfile handleLogout={handleLogout} loggingOut={loggingOut} />
          )} */}
          <UserProfile />
        </header>

        <main className="px-4 py-6">
          {/* Rest of your content */}
        </main>
      </div>
    </div>
  );
}

export default NavBar;
