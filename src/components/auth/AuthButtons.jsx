import React from 'react';

const AuthButtons = () => {
  return (
    <div className="space-y-4">
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
        Sign In
      </button>
      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200">
        Create Account
      </button>
    </div>
  );
};

export default AuthButtons;