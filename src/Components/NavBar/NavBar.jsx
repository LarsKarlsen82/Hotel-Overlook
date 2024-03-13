// //NavBar.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faBars } from '@fortawesome/free-solid-svg-icons';
// import { useAuth } from '../../Providers/AuthContext'; 

// // Import your logo image
// import LogoImage from '../../Assets/images/Logo.jpg';

// const NavBar = () => {
//   const [isMenuVisible, setMenuVisible] = useState(false);
//   const { user } = useAuth();

//   const handleMenuToggle = () => {
//     setMenuVisible(!isMenuVisible);
//   };

//   return (
//     <div>
//       <header>
//       {user ? (
//           <div className="text-white mt-4">
//             You are logged in as {user.email}
//           </div>
//         ) : null}
//         <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-white bg-gray-800">
//           <div className=' pl-24 py-8'>
//             <h2 className='text-4xl'>Hotel Overlook</h2>

//             <div className="text-yellow-500 mt-4 bg-gray-800">
//                 {/* Add stars here */}
//                 <FontAwesomeIcon icon={faStar} />
//                 <FontAwesomeIcon icon={faStar} />
//                 <FontAwesomeIcon icon={faStar} />
//                 <FontAwesomeIcon icon={faStar} />
//                 <FontAwesomeIcon icon={faStar} />
//       </div>
      
//           </div>

//           <FontAwesomeIcon
//             icon={faBars}
//             className="h-6 w-6 cursor-pointer md:hidden block text-gray-700 bg-gray-800"
//             onClick={handleMenuToggle}
//           />

//           <div
//             className={`${
//               isMenuVisible ? 'block' : 'hidden'
//             } w-full md:flex md:items-center md:w-auto`}
//             id="menu"
//           >
//             <ul className="pt-4 text-base text-gray-100 md:flex md:justify-between md:pt-0 pr-16">
//             <li>
//               <Link to="/" className="md:p-4 py-2 block hover:text-red-600">
//                 Forside&nbsp;&nbsp;&nbsp;&nbsp;| 
//               </Link>
//             </li>

//               <li>
//                 <Link to="/hotels" className="md:p-4 py-2 block hover:text-red-600">
//                   Hoteller & destinationer&nbsp;&nbsp;&nbsp;&nbsp;| 
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/rooms" className="md:p-4 py-2 block hover:text-red-600">
//                   Værelser&nbsp;&nbsp;&nbsp;&nbsp;| 
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/reservation" className="md:p-4 py-2 block hover:text-red-600">
//                   Reservation&nbsp;&nbsp;&nbsp;&nbsp;| 
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/login" className="md:p-4 py-2 block hover:text-red-600">
//                   Login
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </nav>
//       </header>

//     </div>
//   );
// };

// export default NavBar;


// NavBar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBars } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../Providers/AuthContext';

// Import your logo image
import LogoImage from '../../Assets/images/Logo.jpg';

const NavBar = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const { user } = useAuth();

  const handleMenuToggle = () => {
    setMenuVisible(!isMenuVisible);
  };

    // Listen for changes in the authentication status
    useEffect(() => {
      // You can perform any other actions here when the authentication status changes
      console.log('Authentication status changed:', user);
    }, [user]);

  return (
    <div>
      <header>
        <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-white bg-gray-800">
          <div className=' pl-24 py-8'>
            <h2 className='text-4xl'>Hotel Overlook</h2>

            <div className="text-yellow-500 mt-4 bg-gray-800">
              {/* Add stars here */}
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
          </div>

          <FontAwesomeIcon
            icon={faBars}
            className="h-6 w-6 cursor-pointer md:hidden block text-gray-700 bg-gray-800"
            onClick={handleMenuToggle}
          />

          <div
            className={`${
              isMenuVisible ? 'block' : 'hidden'
            } w-full md:flex md:items-center md:w-auto`}
            id="menu"
          >
            <ul className="pt-4 text-base text-gray-100 md:flex md:justify-between md:pt-0 pr-16">
              <li>
                <Link to="/" className="md:p-4 py-2 block hover:text-red-600">
                  Forside&nbsp;&nbsp;&nbsp;&nbsp;|
                </Link>
              </li>

              <li>
                <Link to="/hotels" className="md:p-4 py-2 block hover:text-red-600">
                  Hoteller & destinationer&nbsp;&nbsp;&nbsp;&nbsp;|
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="md:p-4 py-2 block hover:text-red-600">
                  Værelser&nbsp;&nbsp;&nbsp;&nbsp;|
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="md:p-4 py-2 block hover:text-red-600">
                  Reservation&nbsp;&nbsp;&nbsp;&nbsp;|
                </Link>
              </li>
              <li>
                <Link to="/login" className="md:p-4 py-2 block hover:text-red-600">
                  Login
                </Link>
              </li>

            </ul> 
          </div>
        </nav>
      </header>

      {user && (
        <div className="text-white mt-4 bg-gray-800 p-2">
          You are logged in as {user.email}
        </div>
      )}
    </div>
  );
};

export default NavBar;
