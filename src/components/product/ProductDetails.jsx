import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosHeartEmpty, IoIosHeart, IoIosShareAlt } from 'react-icons/io';
import { BsBookmark, BsBookmarkFill, BsChat } from 'react-icons/bs';
import { itemsApi } from '../../services/api';
import socketService from '../../services/socket';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Fallback placeholder product in case API fails
  const placeholderProducts = {
    1: {
      id: 1,
      title: "MacBook Pro 2019",
      description: "Barely used MacBook Pro with 16GB RAM and 512GB SSD. Perfect for coding and design work. Includes charger and protective case. Battery health at 92%.",
      price: "899.00",
      category: "electronics",
      images: [
        "https://placehold.co/800x600/1e293b/a1a1aa?text=MacBook+Pro+Main",
        "https://placehold.co/800x600/1e293b/a1a1aa?text=MacBook+Pro+Side",
        "https://placehold.co/800x600/1e293b/a1a1aa?text=MacBook+Pro+Back"
      ],
      seller: {
        name: "Alex Kim",
        rating: 4.8,
        reviews: 24,
        joinDate: "Sep 2022",
        avatar: "https://placehold.co/100/1e293b/a1a1aa?text=AK"
      },
      condition: "Like New",
      location: "North Campus",
      postedDate: "2 days ago",
      specs: [
        { name: "Brand", value: "Apple" },
        { name: "Model", value: "MacBook Pro 2019" },
        { name: "Processor", value: "Intel Core i7" },
        { name: "RAM", value: "16GB" },
        { name: "Storage", value: "512GB SSD" },
        { name: "Display", value: "13.3 inch Retina" }
      ]
    },
    2: {
      id: 2,
      title: "Calculus Textbook",
      description: "Calculus: Early Transcendentals 8th Edition. Required for Calc 101. Minimal highlighting. All pages intact and in excellent condition.",
      price: "45.00",
      category: "books",
      images: [
        "https://placehold.co/800x600/1e293b/a1a1aa?text=Textbook+Cover",
        "https://placehold.co/800x600/1e293b/a1a1aa?text=Textbook+Inside",
        "https://placehold.co/800x600/1e293b/a1a1aa?text=Textbook+Back"
      ],
      seller: {
        name: "Jamie Chen",
        rating: 4.6,
        reviews: 12,
        joinDate: "Jan 2023",
        avatar: "https://placehold.co/100/1e293b/a1a1aa?text=JC"
      },
      condition: "Good",
      location: "South Campus",
      postedDate: "1 week ago",
      specs: [
        { name: "Author", value: "James Stewart" },
        { name: "Edition", value: "8th" },
        { name: "Subject", value: "Mathematics" },
        { name: "ISBN", value: "978-1285741550" },
        { name: "Pages", value: "1368" }
      ]
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const data = await itemsApi.getItemById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details. Using placeholder data instead.');
        setProduct(placeholderProducts[id] || placeholderProducts[1]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-6">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-400 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Back button and actions */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-gray-900/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center text-gray-300 hover:text-teal-400 transition-colors">
            <IoIosArrowBack size={24} />
            <span className="ml-2 font-medium">Back</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              {isBookmarked ? 
                <BsBookmarkFill size={20} className="text-teal-400" /> : 
                <BsBookmark size={20} className="text-gray-300" />
              }
            </button>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              {isFavorite ? 
                <IoIosHeart size={24} className="text-red-500" /> : 
                <IoIosHeartEmpty size={24} className="text-gray-300" />
              }
            </button>
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <IoIosShareAlt size={24} className="text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-700/50 bg-gray-800">
              <img 
                src={product.images[activeImage]} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                      activeImage === index ? 'border-teal-500' : 'border-gray-700'
                    }`}
                  >
                    <img src={image} alt={`${product.title} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 bg-teal-500/20 text-teal-400 text-sm font-medium rounded-full">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
                <span className="text-gray-400 text-sm">{product.postedDate}</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.title}</h1>
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-teal-400">${product.price}</span>
              </div>
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-lg font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.specs.map((spec, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-400">{spec.name}:</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span className="text-gray-400">Condition:</span>
                  <span className="text-white font-medium">{product.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white font-medium">{product.location}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
              <div className="flex items-center space-x-4">
                <img 
                  src={product.seller.avatar} 
                  alt={product.seller.name} 
                  className="w-12 h-12 rounded-full border border-gray-700"
                />
                <div>
                  <p className="font-medium text-white">{product.seller.name}</p>
                  <div className="flex items-center text-sm text-gray-400">
                    <span className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      {product.seller.rating}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{product.seller.reviews} reviews</span>
                    <span className="mx-2">•</span>
                    <span>Member since {product.seller.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
              <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                <BsChat className="mr-2" size={18} />
                Contact Seller
              </button>
              <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg border border-gray-700 transition-colors">
                Make an Offer
              </button>
            </div>
          </div>
        </div>

        {/* Related Items Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 overflow-hidden hover:border-teal-500/30 transition-all duration-300">
                <div className="h-40 bg-gray-700 relative">
                  <img src={`https://placehold.co/400x300/1e293b/a1a1aa?text=Item+${item}`} alt={`Similar item ${item}`} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white">Similar Product {item}</h3>
                  <p className="text-sm text-gray-400 mb-2">Brief description here</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-teal-400">${Math.floor(Math.random() * 100) + 20}.00</span>
                    <span className="text-xs text-gray-400">3 days ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;