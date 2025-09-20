import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {children}
      </div>
    </div>
  );
};

export default Container;