import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function UserProfile({ handleLogout, loggingOut }) {
  const [showMenu, setShowMenu] = useState(false);

  const userNavigation = [
    { name: 'My Profile', link: '/profile' },
    { name: 'My Orders', link: '/orders' },
    { name: 'Sign out', link: '/logout' },
  ];

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none"
          onClick={toggleMenu}
        >
          {/* Add your profile icon/svg here */}
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* Your SVG paths here */}
          </svg>
        </button>
      </div>

      {showMenu && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {userNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => setShowMenu(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              disabled={loggingOut}
            >
              {loggingOut ? 'Logging Out...' : 'Logout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
