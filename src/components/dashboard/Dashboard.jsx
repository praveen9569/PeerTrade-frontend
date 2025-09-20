import React, { useState, useEffect } from 'react';
import { IoIosSearch, IoIosChatboxes, IoIosAddCircle, IoIosArrowBack } from 'react-icons/io';
import { PiBuildingsLight } from "react-icons/pi";
import { BsPersonCircle, BsBookmark, BsHeart, BsShare } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { itemsApi } from '../../services/api';

const Dashboard = ({ onLogout }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fallback placeholder items in case API fails
  const placeholderItems = [
    { id: 1, title: "MacBook Pro 2019", description: "Barely used MacBook Pro with 16GB RAM and 512GB SSD. Perfect for coding and design work.", price: "899.00", category: "electronics", image: "https://placehold.co/400x300/1e293b/a1a1aa?text=MacBook+Pro", seller: "Alex Kim", rating: 4.8, reviews: 24, condition: "Like New" },
    { id: 2, title: "Calculus Textbook", description: "Calculus: Early Transcendentals 8th Edition. Required for Calc 101. Minimal highlighting.", price: "45.00", category: "books", image: "https://placehold.co/400x300/1e293b/a1a1aa?text=Textbook", seller: "Jamie Chen", rating: 4.6, reviews: 12, condition: "Good" },
    { id: 3, title: "Mini Fridge", description: "Compact 3.2 cu ft mini fridge. Perfect for dorm rooms. Energy efficient and quiet operation.", price: "75.00", category: "furniture", image: "https://placehold.co/400x300/1e293b/a1a1aa?text=Mini+Fridge", seller: "Taylor Wong", rating: 4.9, reviews: 18, condition: "Excellent" },
    { id: 4, title: "Mechanical Keyboard", description: "Keychron K2 mechanical keyboard with RGB backlight and Brown switches. Great for typing and gaming.", price: "60.00", category: "electronics", image: "https://placehold.co/400x300/1e293b/a1a1aa?text=Keyboard", seller: "Jordan Lee", rating: 4.7, reviews: 9, condition: "Like New" },
    { id: 5, title: "Desk Lamp", description: "LED desk lamp with adjustable brightness and color temperature. USB charging port included.", price: "28.50", category: "furniture", image: "https://placehold.co/400x300/1e293b/a1a1aa?text=Desk+Lamp", seller: "Morgan Smith", rating: 4.5, reviews: 15, condition: "Excellent" },
    { id: 6, title: "Psychology Textbook", description: "Psychology: An Introduction 12th Edition. Perfect condition, no markings.", price: "38.00", category: "books", image: "https://placehold.co/400x300/1e293b/a1a1aa?text=Psychology", seller: "Casey Johnson", rating: 4.8, reviews: 7, condition: "Like New" },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await itemsApi.getAllItems();
        setItems(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load items. Using placeholder data instead.');
        setItems(placeholderItems);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'books', name: 'Books' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'clothing', name: 'Clothing' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-inter">
      {/* Navbar with glassmorphism effect */}
      <nav className="fixed top-0 w-full z-10 backdrop-blur-md bg-gray-900/80 border-b border-teal-700/50 shadow-lg px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white tracking-widest">
            <span className="text-teal-400">Campus</span><span className="text-gray-200">Swap</span>
          </div>
          
          {/* Search bar with animation */}
          <div className="relative hidden md:block w-1/3">
            <input 
              type="text" 
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800/70 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            />
            <IoIosSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-teal-400 transition duration-300 relative">
              <IoIosChatboxes size={24} />
              <span className="absolute -top-1 -right-1 bg-teal-500 text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
            <button className="text-gray-400 hover:text-teal-400 transition duration-300">
              <IoIosAddCircle size={26} />
            </button>
            <button 
              onClick={onLogout}
              className="text-gray-400 hover:text-teal-400 transition duration-300"
            >
              <BsPersonCircle size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 pt-28 pb-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Essential</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Buy, sell, or swap second-hand items right here on campus. Save money and reduce waste!
          </p>
        </div>

        {/* Mobile Search */}
        <div className="relative mb-8 md:hidden">
          <input 
            type="text" 
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800/70 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
          />
          <IoIosSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category.id 
                    ? 'bg-teal-600 text-white font-medium shadow-lg shadow-teal-500/20' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Subtle glowing effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-blue-500/10 opacity-20 blur-3xl rounded-3xl"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>
            ) : filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <Link to={`/product/${item.id}`} key={item.id} className="group">
                  <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/10 hover:border-teal-500/30">
                    <div className="relative">
                      <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button className="p-1.5 bg-gray-900/80 backdrop-blur-sm rounded-full text-gray-300 hover:text-teal-400 transition-colors duration-300">
                          <BsBookmark size={16} />
                        </button>
                        <button className="p-1.5 bg-gray-900/80 backdrop-blur-sm rounded-full text-gray-300 hover:text-red-400 transition-colors duration-300">
                          <BsHeart size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300">{item.title}</h3>
                        <span className="text-xl font-bold text-teal-400">${item.price}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1">
                          <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-xs text-white font-medium">
                            {item.seller.charAt(0)}
                          </div>
                          <span className="text-xs text-gray-400">{item.seller}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span className="text-xs text-gray-300">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="bg-gray-800/50 rounded-xl p-8 max-w-md mx-auto">
                  <div className="text-gray-400 text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-white mb-2">No items found</h3>
                  <p className="text-gray-400 mb-6">Try adjusting your search or category filters</p>
                  <button 
                    onClick={() => {setActiveCategory('all'); setSearchQuery('');}}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 w-full bg-gray-900/90 backdrop-blur-md border-t border-gray-800 py-3 px-6 z-10">
        <div className="flex justify-between items-center">
          <button className="flex flex-col items-center text-teal-500">
            <PiBuildingsLight size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-teal-400 transition duration-300">
            <IoIosSearch size={24} />
            <span className="text-xs mt-1">Search</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-teal-400 transition duration-300">
            <IoIosAddCircle size={28} />
            <span className="text-xs mt-1">Sell</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-teal-400 transition duration-300">
            <IoIosChatboxes size={24} />
            <span className="text-xs mt-1">Chat</span>
          </button>
          <button 
            onClick={onLogout}
            className="flex flex-col items-center text-gray-400 hover:text-teal-400 transition duration-300"
          >
            <BsPersonCircle size={24} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;