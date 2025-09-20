import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    course: '',
    contactInfo: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await register(registerData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/logo.svg"
          alt="CollegeSwap"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-text-light dark:text-text-dark">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-text-muted-light dark:text-text-muted-dark">
          Or{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface-light dark:bg-surface-dark py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-error bg-opacity-10 border border-error rounded-md">
              <p className="text-error text-sm">{error}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-light dark:text-text-dark">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-md border border-border-light dark:border-border-dark px-3 py-2 placeholder-text-muted-light dark:placeholder-text-muted-dark shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-light dark:text-text-dark">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-md border border-border-light dark:border-border-dark px-3 py-2 placeholder-text-muted-light dark:placeholder-text-muted-dark shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                />
              </div>
            </div>

            <div>
              <label htmlFor="course" className="block text-sm font-medium text-text-light dark:text-text-dark">
                Course/Major
              </label>
              <div className="mt-1">
                <input
                  id="course"
                  name="course"
                  type="text"
                  required
                  value={formData.course}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-md border border-border-light dark:border-border-dark px-3 py-2 placeholder-text-muted-light dark:placeholder-text-muted-dark shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contactInfo" className="block text-sm font-medium text-text-light dark:text-text-dark">
                Contact Information
              </label>
              <div className="mt-1">
                <input
                  id="contactInfo"
                  name="contactInfo"
                  type="text"
                  required
                  value={formData.contactInfo}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-md border border-border-light dark:border-border-dark px-3 py-2 placeholder-text-muted-light dark:placeholder-text-muted-dark shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                  placeholder="Phone number or other contact method"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-light dark:text-text-dark">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-md border border-border-light dark:border-border-dark px-3 py-2 placeholder-text-muted-light dark:placeholder-text-muted-dark shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-light dark:text-text-dark">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-md border border-border-light dark:border-border-dark px-3 py-2 placeholder-text-muted-light dark:placeholder-text-muted-dark shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;