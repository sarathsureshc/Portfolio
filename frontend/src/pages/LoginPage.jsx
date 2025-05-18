import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login, register as registerUser, clearError } from '../slices/authSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import { LogIn, UserPlus } from 'lucide-react';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(clearError());
    
    if (isRegister) {
      dispatch(registerUser(data));
    } else {
      dispatch(login(data));
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    dispatch(clearError());
  };

  return (
    <>
      <Meta title={isRegister ? 'Register | Sarath Suresh C' : 'Login | Sarath Suresh C'} />
      <Header />
      <main className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
                {isRegister ? 'Create an Account' : 'Login to Your Account'}
              </h2>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 dark:bg-red-900 dark:text-red-100 dark:border-red-700" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {isRegister && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={`form-input ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                      placeholder="John Doe"
                      {...register('name', { required: isRegister ? 'Name is required' : false })}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                    )}
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`form-input ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                    placeholder="your.email@example.com"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={`form-input ${errors.password ? 'border-red-500 dark:border-red-500' : ''}`}
                    placeholder="••••••••"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="btn-primary flex items-center justify-center w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isRegister ? 'Registering...' : 'Logging in...'}
                    </>
                  ) : (
                    <>
                      {isRegister ? (
                        <>
                          <UserPlus size={18} className="mr-2" /> Register
                        </>
                      ) : (
                        <>
                          <LogIn size={18} className="mr-2" /> Login
                        </>
                      )}
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-8 text-center">
                <button
                  onClick={toggleForm}
                  className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none text-sm"
                >
                  {isRegister
                    ? 'Already have an account? Login'
                    : "Don't have an account? Register"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;