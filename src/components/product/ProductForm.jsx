import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'electronics',
    condition: 'new',
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    // In a real implementation, this would handle file uploads
    // For now, we'll just store the file names
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { from: '/products/new' } });
        return;
      }

      // For demo purposes, simulate successful product creation
      // In a real implementation, this would send data to the backend
      console.log('Product data submitted:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to products page after successful submission
      navigate('/products');
      return;

      // The code below would be used with a real backend
      
      // Create form data for file upload
      const productData = new FormData();
      productData.append('title', formData.title);
      productData.append('description', formData.description);
      productData.append('price', formData.price);
      productData.append('category', formData.category);
      productData.append('condition', formData.condition);
      
      // Add images if any
      formData.images.forEach(image => {
        productData.append('images', image);
      });
<<<<<<< HEAD
      

      
      const response = await fetch('https://campus-swap-api.onrender.com', {
=======
  
      const response = await fetch('https://peertrade-backend.onrender.com/api/products', {
>>>>>>> 79d6fdf47590e26a236114a95b2f57d92a8d3e5f
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: productData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }

      const data = await response.json();
      navigate(`/products/${data._id}`);
      
    } catch (err) {
      setError(err.message || 'An error occurred while creating the product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">List a New Item</h1>

        {error && (
          <div className="mb-4 p-3 bg-error/20 text-error rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full p-3 rounded border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 rounded border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark"
                required
              >
                <option value="electronics">Electronics</option>
                <option value="books">Books</option>
                <option value="furniture">Furniture</option>
                <option value="clothing">Clothing</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full p-3 rounded border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark"
              required
            >
              <option value="new">New</option>
              <option value="like_new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Images</label>
            <input
              type="file"
              name="images"
              onChange={handleImageChange}
              multiple
              accept="image/*"
              className="w-full p-3 rounded border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark"
            />
            <p className="text-xs text-neutral-dark/70 dark:text-neutral-light/70 mt-1">
              You can upload up to 5 images. First image will be the main product image.
            </p>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-neutral-light dark:border-neutral-dark rounded hover:bg-neutral-light/20 dark:hover:bg-neutral-dark/20 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
