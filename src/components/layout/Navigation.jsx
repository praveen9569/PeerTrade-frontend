import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosSearch, IoIosChatboxes, IoIosAddCircle, IoMdNotifications } from 'react-icons/io';
import { BsPersonCircle } from 'react-icons/bs';

const Navigation = ({ onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-teal-400 tracking-wider">CampusSwap</span>
              </Link>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <Link to="/" className={`px-3 py-2 text-sm font-medium ${
                  isActive('/') ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-300 hover:text-teal-300'
                }`}>
                  Browse
                </Link>
                <Link to="/messages" className={`px-3 py-2 text-sm font-medium ${
                  isActive('/messages') ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-300 hover:text-teal-300'
                }`}>
                  Messages
                </Link>
                <Link to="/sell" className={`px-3 py-2 text-sm font-medium ${
                  isActive('/sell') ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-300 hover:text-teal-300'
                }`}>
                  Sell
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none">
                <IoIosSearch className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none">
                <IoMdNotifications className="h-6 w-6" />
              </button>
              <Link to="/profile" className={`p-2 rounded-full ${
                isActive('/profile') ? 'bg-gray-800 text-teal-400' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}>
                <BsPersonCircle className="h-6 w-6" />
              </Link>
              <button 
                onClick={onLogout}
                className="ml-2 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Logout
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 shadow-lg">
            <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') ? 'bg-gray-800 text-teal-400' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}>
              Browse
            </Link>
            <Link to="/messages" className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/messages') ? 'bg-gray-800 text-teal-400' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}>
              Messages
            </Link>
            <Link to="/sell" className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/sell') ? 'bg-gray-800 text-teal-400' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}>
              Sell
            </Link>
            <Link to="/profile" className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/profile') ? 'bg-gray-800 text-teal-400' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}>
              Profile
            </Link>
            <button 
              onClick={onLogout}
              className="w-full mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-teal-600 hover:bg-teal-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 w-full bg-gray-900 border-t border-gray-800 z-50">
        <div className="flex justify-around">
          <Link to="/" className={`flex flex-col items-center py-2 ${isActive('/') ? 'text-teal-400' : 'text-gray-400'}`}>
            <IoIosSearch className="h-6 w-6" />
            <span className="text-xs mt-1">Browse</span>
          </Link>
          <Link to="/messages" className={`flex flex-col items-center py-2 ${isActive('/messages') ? 'text-teal-400' : 'text-gray-400'}`}>
            <IoIosChatboxes className="h-6 w-6" />
            <span className="text-xs mt-1">Messages</span>
          </Link>
          <Link to="/sell" className={`flex flex-col items-center py-2 ${isActive('/sell') ? 'text-teal-400' : 'text-gray-400'}`}>
            <IoIosAddCircle className="h-8 w-8 -mt-1" />
            <span className="text-xs">Sell</span>
          </Link>
          <Link to="/profile" className={`flex flex-col items-center py-2 ${isActive('/profile') ? 'text-teal-400' : 'text-gray-400'}`}>
            <BsPersonCircle className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;