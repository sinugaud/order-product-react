// import React, { useState } from 'react';
// import './NavBarExample.css'; // Import your CSS file for styling transitions

// function NavBarExample() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div>
//       <nav className="bg-white p-4 shadow-lg">
//         <div className="flex justify-between items-center">
//           <h1 className="text-xl font-semibold">Navbar</h1>
//           <button className="block lg:hidden focus:outline-none" onClick={toggleSidebar}>
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               ></path>
//             </svg>
//           </button>
//         </div>
//       </nav>

//       <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
//         <div className="bg-gray-800 text-white w-1/5">
//           <div className="p-4">
//             <h1 className="text-2xl font-semibold">Sidebar</h1>
//             <ul className="mt-4">
//               <li className="py-2">Link 1</li>
//               <li className="py-2">Link 2</li>
//               <li className="py-2">Link 3</li>
//               <li className="py-2">Link 4</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="main-content">
//         <div className="flex-1 p-4">
//           <div className="mt-4">
//             <p>Main Content Goes Here</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NavBarExample;
