// NoPage.jsx
import React from 'react';
import errorGif from '../../Assets/images/Error_404.gif';

const NoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <img
        src={errorGif}
        alt="404 Not Found"
        className="max-w-96 h14"
      />
    </div>
  );
};

export default NoPage;
