// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet';

// const Res = () => {
//     const [menuOpen, setMenuOpen] = useState(false);

//     useEffect(() => {
//         const onToggleMenu = () => {
//             setMenuOpen(!menuOpen);
//         };

//         document.querySelector('.menu-icon').addEventListener('click', onToggleMenu);

//         return () => {
//             document.querySelector('.menu-icon').removeEventListener('click', onToggleMenu);
//         };
//     }, [menuOpen]);

//     return (
//         <div>
//             <Helmet>
//                 {/* Your Helmet content */}
//             </Helmet>

//             <div className="font-[Poppins] bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] h-screen">
//                 <header className="bg-white">
//                     <nav className="flex justify-between items-center w-[92%] mx-auto">
//                         {/* Your header content */}
//                         <div className="flex items-center gap-6">
//                             <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">Sign in</button>
//                             <ion-icon className="text-3xl cursor-pointer md:hidden menu-icon" name="menu"></ion-icon>
//                         </div>
//                     </nav>
//                 </header>
//             </div>
//         </div>
//     );
// };

// export default Res;
