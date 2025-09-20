import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex flex-1">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img src="/logo.svg" alt="CollegeSwap Logo" className="h-8 w-auto" />
                <span className="ml-2 text-xl font-bold text-primary">CollegeSwap</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-text-light dark:text-text-dark hover:border-primary">
                Home
              </Link>
              <Link to="/products" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-text-light dark:text-text-dark hover:border-primary">
                Browse Items
              </Link>
              {isLoggedIn && (
                <>
                  <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-text-light dark:text-text-dark hover:border-primary">
                    Dashboard
                  </Link>
                  <Link to="/chat" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-text-light dark:text-text-dark hover:border-primary">
                    Messages
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="text-sm font-medium text-text-light dark:text-text-dark hover:text-primary">
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-sm font-medium text-text-light dark:text-text-dark hover:text-primary">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-muted-light dark:text-text-muted-dark hover:text-text-light hover:bg-background-light dark:hover:text-text-dark dark:hover:bg-background-dark"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark hover:border-primary">
              Home
            </Link>
            <Link to="/products" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark hover:border-primary">
              Browse Items
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/dashboard" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark hover:border-primary">
                  Dashboard
                </Link>
                <Link to="/chat" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark hover:border-primary">
                  Messages
                </Link>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-border-light dark:border-border-dark">
            <div className="space-y-1">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark hover:border-primary">
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark hover:border-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark hover:border-primary">
                    Login
                  </Link>
                  <Link to="/register" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark hover:border-primary">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;