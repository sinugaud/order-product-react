import React, { useState } from 'react';
import Sidebar from './Sidebar';

// Your navigation data
const navigation = [
  { name: 'Products', link: '/', user: true },
  { name: 'Orders', link: '/orders', admin: true },
];

function NavBar() {
  const [userInfo, setUserInfo] = useState(null); // Simulated user state

  const userNavigation = userInfo
    ? [
        { name: 'My Profile', link: '/profile' },
        { name: 'My Orders', link: '/my-orders' },
        { name: 'Sign out', link: '/logout' },
      ]
    : [];

  return (
    <div className="flex">
      {/* Sidebar (Assuming Sidebar component) */}
      <Sidebar />
      <div className="bg-gray-800 w-64 overflow-y-auto flex-shrink-0">
        {/* Sidebar content */}
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.link}
            className="block px-4 py-2 text-white hover:bg-gray-700"
          >
            {item.name}
          </a>
        ))}
      </div>

      {/* Navbar */}
      <div className="flex-grow">
        <header className="bg-white shadow flex items-center justify-between px-4 py-3">
          {/* E-Commerce title */}
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            E-Commerce
          </h1>

          {/* User profile, sign-out, and orders */}
          {userInfo && (
            <div className="flex space-x-4">
              {/* Rendering user navigation links */}
              {userNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="text-gray-700 hover:text-black"
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* Main content */}
        <main className="px-4 py-6">
          {/* Rest of your content */}
        </main>
      </div>
    </div>
  );
}

export default NavBar;
