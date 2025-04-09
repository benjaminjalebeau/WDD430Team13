'use client';
import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#8ECAE6] border-t border-gray-300 py-6">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-4 sm:mb-0 text-center">
            <a href="/" className="text-xl font-semibold text-gray-800 hover:text-gray-600">
              HANDCRAFTED HAVEN
            </a>

            {/* Social Media */}
            <div className="flex justify-center space-x-4 mt-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600 text-sm font-medium"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600 text-sm font-medium"
                aria-label="XTwitter"
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600 text-sm font-medium"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links. Add more if needed */}
          <div className="flex flex-col sm:flex-row sm:space-x-6 mb-4 sm:mb-0">
            {['Products', 'About Us', 'Help', 'Contact Us'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-800 hover:text-gray-600 text-sm font-medium"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-800">
          &copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;