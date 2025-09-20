import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosSettings, IoIosLogOut } from 'react-icons/io';
import { BsGrid3X3, BsBookmark, BsHeart } from 'react-icons/bs';

const UserProfile = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('listings');
  
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    username: 'alexj',
    avatar: 'https://placehold.co/200/1e293b/a1a1aa?text=AJ',
    bio: 'Computer Science student. Selling items I no longer need. Fast responses!',
    joinDate: 'September 2022',
    stats: {
      listings: 8,
      sold: 12,
      rating: 4.9
    }
  };
  
  // Mock listings data
  const listings = [
    { id: 1, title: 'Wireless Headphones', price: '85.00', image: 'https://placehold.co/400x300/1e293b/a1a1aa?text=Headphones', status: 'active' },
    { id: 2, title: 'Computer Monitor', price: '120.00', image: 'https://placehold.co/400x300/1e293b/a1a1aa?text=Monitor', status: 'active' },
    { id: 3, title: 'Desk Chair', price: '65.00', image: 'https://placehold.co/400x300/1e293b/a1a1aa?text=Chair', status: 'active' },
    { id: 4, title: 'Bluetooth Speaker', price: '35.00', image: 'https://placehold.co/400x300/1e293b/a1a1aa?text=Speaker', status: 'sold' },
  ];
  
  const savedItems = [
    { id: 5, title: 'Graphic Tablet', price: '110.00', image: 'https://placehold.co/400x300/1e293b/a1a1aa?text=Tablet', seller: 'Jamie L.' },
    { id: 6, title: 'Desk Lamp', price: '28.50', image: 'https://placehold.co/400x300/1e293b/a1a1aa?text=Lamp', seller: 'Morgan S.' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-gray-900/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center text-gray-300 hover:text-teal-400 transition-colors">
            <IoIosArrowBack size={24} />
            <span className="ml-2 font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <IoIosSettings size={24} className="text-gray-300" />
            </button>
            <button 
              onClick={onLogout}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <IoIosLogOut size={24} className="text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-teal-500/30"
            />
            <div className="absolute bottom-0 right-0 bg-teal-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold">
              {user.stats.rating}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
            <p className="text-gray-400 mb-4">@{user.username} • Member since {user.joinDate}</p>
            <p className="text-gray-300 mb-6 max-w-2xl">{user.bio}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{user.stats.listings}</p>
                <p className="text-sm text-gray-400">Active Listings</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{user.stats.sold}</p>
                <p className="text-sm text-gray-400">Items Sold</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-teal-400">{user.stats.rating}</p>
                <p className="text-sm text-gray-400">Rating</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors">
                Edit Profile
              </button>
              <button className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg border border-gray-700 transition-colors">
                Share Profile
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-800 mb-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('listings')}
              className={`pb-4 px-1 font-medium flex items-center ${
                activeTab === 'listings' 
                  ? 'text-teal-400 border-b-2 border-teal-400' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <BsGrid3X3 className="mr-2" />
              My Listings
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`pb-4 px-1 font-medium flex items-center ${
                activeTab === 'saved' 
                  ? 'text-teal-400 border-b-2 border-teal-400' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <BsBookmark className="mr-2" />
              Saved Items
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`pb-4 px-1 font-medium flex items-center ${
                activeTab === 'liked' 
                  ? 'text-teal-400 border-b-2 border-teal-400' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <BsHeart className="mr-2" />
              Liked Items
            </button>
          </div>
        </div>
        
        {/* Content based on active tab */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">My Listings</h2>
              <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors text-sm">
                + New Listing
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {listings.map(item => (
                <Link to={`/product/${item.id}`} key={item.id} className="group">
                  <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/10 hover:border-teal-500/30">
                    <div className="relative">
                      <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                      {item.status === 'sold' && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="px-4 py-1 bg-red-500 text-white font-medium rounded-full">SOLD</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-white group-hover:text-teal-400 transition-colors">{item.title}</h3>
                        <span className="font-bold text-teal-400">${item.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs ${item.status === 'active' ? 'text-green-400' : 'text-gray-400'}`}>
                          {item.status === 'active' ? 'Active' : 'Sold'}
                        </span>
                        <button className="text-xs text-gray-400 hover:text-teal-400">Edit</button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'saved' && (
          <div>
            <h2 className="text-xl font-bold mb-6">Saved Items</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {savedItems.map(item => (
                <Link to={`/product/${item.id}`} key={item.id} className="group">
                  <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/10 hover:border-teal-500/30">
                    <div className="relative">
                      <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                      <button className="absolute top-3 right-3 p-1.5 bg-gray-900/80 backdrop-blur-sm rounded-full text-teal-400 hover:text-gray-300 transition-colors duration-300">
                        <BsBookmark size={16} />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-white group-hover:text-teal-400 transition-colors">{item.title}</h3>
                        <span className="font-bold text-teal-400">${item.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">By {item.seller}</span>
                        <button className="text-xs text-gray-400 hover:text-teal-400">View</button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {savedItems.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-gray-800/50 rounded-xl p-8 max-w-md mx-auto">
                  <div className="text-gray-400 text-5xl mb-4">🔖</div>
                  <h3 className="text-xl font-bold text-white mb-2">No saved items yet</h3>
                  <p className="text-gray-400 mb-6">Items you save will appear here</p>
                  <Link to="/" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    Browse items
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'liked' && (
          <div className="text-center py-16">
            <div className="bg-gray-800/50 rounded-xl p-8 max-w-md mx-auto">
              <div className="text-gray-400 text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-white mb-2">No liked items yet</h3>
              <p className="text-gray-400 mb-6">Items you like will appear here</p>
              <Link to="/" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                Browse items
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;