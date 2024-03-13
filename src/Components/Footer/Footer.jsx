// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

// const Footer = () => {
//   // Function to generate a random link for social media
//   const getRandomSocialLink = () => {
//     const socialMediaLinks = [
//       'https://twitter.com/',
//       'https://facebook.com/',
//       'https://instagram.com/',
//       // Add more social media links as needed
//     ];

//     const randomIndex = Math.floor(Math.random() * socialMediaLinks.length);
//     return socialMediaLinks[randomIndex];
//   };

//   return (
//     <footer className="bg-white text-black p-4 flex justify-between items-center">
//       <div className="text-left">
//         <p className="m-0">&copy; 2024 Hotel Overlook. All rights reserved.</p>
//       </div>

//       <div className="flex items-center justify-center space-x-4 flex-grow">
//         {/* Social media links */}
//         <a href={getRandomSocialLink()} target="_blank" rel="noopener noreferrer">
//           <FontAwesomeIcon icon={faTwitter} size="2x" />
//         </a>
//         <a href={getRandomSocialLink()} target="_blank" rel="noopener noreferrer">
//           <FontAwesomeIcon icon={faFacebook} size="2x" />
//         </a>
//       </div>

//       <ul className="flex items-center space-x-4">
//         {/* W3Schools links in an unordered list */}
//         <li><a href="/">Forside</a></li>
//         <li><a href="/hotels">Hoteller & destinationer</a></li>
//         <li><a href="/rooms">Værelser</a></li>
//         <li><a href="/reservation">Reservation</a></li>
//         <li><a href="/login">Login</a></li>
//       </ul>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  // Function to generate a random link for social media
  const getRandomSocialLink = () => {
    const socialMediaLinks = [
      'https://twitter.com/',
      'https://facebook.com/',
      'https://instagram.com/',
      // Add more social media links as needed
    ];

    const randomIndex = Math.floor(Math.random() * socialMediaLinks.length);
    return socialMediaLinks[randomIndex];
  };

  return (
    <footer className="bg-white text-black p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="text-center md:text-left mb-4 md:mb-0">
        <p className="m-0">&copy; 2024 Hotel Overlook. All rights reserved.</p>
      </div>

      <div className="flex items-center justify-center space-x-4 md:flex-grow md:justify-center md:space-x-4">
        {/* Social media links */}
        <a href={getRandomSocialLink()} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href={getRandomSocialLink()} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
      </div>

      <ul className="flex flex-col items-center md:flex-row md:items-center md:space-x-4">
        {/* W3Schools links in an unordered list */}
        <li><a href="/">Forside</a></li>
        <li><a href="/hotels">Hoteller & destinationer</a></li>
        <li><a href="/rooms">Værelser</a></li>
        <li><a href="/reservation">Reservation</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </footer>
  );
};

export default Footer;

