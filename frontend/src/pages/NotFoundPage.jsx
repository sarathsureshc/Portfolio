import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Meta from '../components/Meta';

const NotFoundPage = () => {
  return (
    <>
      <Meta title="404 - Page Not Found | Sarath Suresh C" />
      <Header />
      <main className="bg-white dark:bg-gray-800 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-md w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-blue-500">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Page Not Found</h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8">
            <Link 
              to="/" 
              className="btn-primary inline-flex items-center"
            >
              <Home size={16} className="mr-2" /> Back to Home
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default NotFoundPage;