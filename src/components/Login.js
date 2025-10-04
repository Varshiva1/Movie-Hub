import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/slice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: Date.now(),
        email: formData.email,
        name: formData.email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${formData.email.split('@')[0]}&background=random&color=fff`
      };
      
      dispatch(loginUser(userData));
      navigate('/');
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get the email from the form or use a default
      const userEmail = formData.email || 'user@gmail.com';
      const emailName = userEmail.split('@')[0];
      
      // Convert email name to proper case (e.g., "john.doe" -> "John Doe")
      const properName = emailName
        .split('.')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
      
      // Mock Google user data using the actual email
      const googleUserData = {
        id: Date.now(),
        email: userEmail,
        name: properName,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(properName)}&background=random&color=fff`,
        provider: 'google'
      };
      
      dispatch(loginUser(googleUserData));
      navigate('/');
    } catch (error) {
      setErrors({ general: 'Google login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate Facebook OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate random user data for demo
      const randomNames = ['Chris Taylor', 'Jessica Martinez', 'Ryan Anderson', 'Amanda White', 'Kevin Lee', 'Rachel Green', 'Tom Wilson', 'Nicole Adams'];
      const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
      const randomEmail = `${randomName.toLowerCase().replace(' ', '.')}@facebook.com`;
      
      // Mock Facebook user data
      const facebookUserData = {
        id: Date.now(),
        email: randomEmail,
        name: randomName,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(randomName)}&background=random&color=fff`,
        provider: 'facebook'
      };
      
      dispatch(loginUser(facebookUserData));
      navigate('/');
    } catch (error) {
      setErrors({ general: 'Facebook login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-300 text-lg">Sign in to your account</p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl">
                {errors.general}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-4 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-4 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                  errors.password ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-200">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <button 
                  type="button"
                  onClick={() => alert('Password reset feature coming soon!')}
                  className="font-medium text-red-400 hover:text-red-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/10 text-sm font-medium text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2">Google</span>
              </button>
              <button
                type="button"
                onClick={handleFacebookLogin}
                className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/10 text-sm font-medium text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-red-400 hover:text-red-300 transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
