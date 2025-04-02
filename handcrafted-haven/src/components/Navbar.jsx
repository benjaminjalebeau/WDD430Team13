'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Here is the list of links that will be generated below.
  const links = [
    {name: 'Home', href: '/'},
    {name: 'Products', href: '#'},
    {name: 'Artisans', href: '#'},
  
  ]

  return (
    <header className="bg-gray-100 border-b border-gray-300">
      <nav className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo will go here, Instead of "HANDCRAFTED HAVEN" */}
          <a href="#" className="text-xl font-semibold text-gray-800 hover:text-gray-600">
            HANDCRAFTED HAVEN
          </a>

          {/* Toggle Button for Mobile */}
          <button
            className="sm:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Navbar Links */}
          {/* Need to verify the colors first with the Team */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:flex sm:items-center sm:space-x-4`}>
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            {/* Sign in our Out buttons */}
            {/* the button styling can be adjusted as needed, I just copied the current styling. */}
            {session ? (
              <>
                
                <button onClick={() => signOut()} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600">
                  Sign Out
                </button>
                <span className="mr-4">Hello, {session.user?.name}</span>
              </>
            ) : (
              <button onClick={() => signIn()} className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Sign In
              </button>
            )}
            
          </div>

          {/* Search Bar */}
          <form className="hidden sm:flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              className="block w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
            
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
