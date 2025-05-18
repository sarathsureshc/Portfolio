import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and bio */}
          <div>
            <Link to="/" className="text-2xl font-bold">Sarath Suresh C</Link>
            <p className="mt-4 text-gray-400">
              MERN Stack Developer specializing in creating elegant, efficient,
              and user-friendly web applications.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-white transition duration-300">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/resume" className="text-gray-400 hover:text-white transition duration-300">
                  Resume
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-400">Email: sarathnandu1983@gmail.com</p>
            <p className="text-gray-400 mt-2">Malappuram, Kerala, India</p>
            
            {/* Social media links */}
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://github.com/sarathsureshc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/sarath-suresh-c" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Linkedin size={20} />
              </a>
              {/* <a 
                href="https://twitter.com/username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Twitter size={20} />
              </a> */}
              <a 
                href="https://instagram.com/23_cyanid3_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Sarath Suresh C. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;