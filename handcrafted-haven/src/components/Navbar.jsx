'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Define the handleSearch function
  const handleSearch = (event) => {
    event.preventDefault();
    router.push(`/products?page=1&search=${searchQuery}`);
    // Add additional logic for handling the search query if needed
    setSearchQuery('');
  };

  const links = [
    {name: 'Home', href: '/'},
    {name: 'Products', href: '/products'},
  ];

  return (
    <header className="bg-[#8ECAE6] border-b border-gray-300">
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to Content
      </a>
      <nav className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
           {/* Logo */}
           
          <img
            src="/logo-handcrafted-haven.jpg" 
            alt="Handcrafted Haven Company Logo"
            className="h-10 w-auto" 
          />
          

          {/* Toggle Button for Mobile */}
          <button
            className="sm:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Navbar Links */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:flex sm:items-center sm:space-x-4`}>
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                aria-label={`Navigate to ${link.name}`}
              >
                {link.name}
              </a>
            ))}
            {/* Sign in or Out buttons */}
            {session ? (
              <>
              <a
                key="My Profile"
                href="/profile"
                className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                aria-label='View your profile page'
              >
                {session.user?.name.split(" ")[0]}'s Profile
              </a>
                <button 
                  onClick={() => signOut({ callbackUrl: "/" })} 
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-600"
                  aria-label='Sign out of your account'
                >
                  Sign Out
                </button>
                
              </>
            ) : (
              <button 
                onClick={() => signIn()} 
                className="px-4 py-2 text-sm font-medium text-white bg-[#023047] rounded-lg hover:bg-[#219EBC]"
                aria-label='Navigate to sign in page.'
              >
                Sign In
              </button>
            )}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex items-center space-x-2">
            <div className="w-full max-w-md flex">
              <label htmlFor='search' className='sr-only'>Search Products or Artisans</label>
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products or artisans..."
                className="w-full px-4 py-2 border rounded-l-lg text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#023047] text-white rounded-r-lg hover:bg-[#219EBC] flex items-center justify-center"
                aria-label='Search products or artisans'
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M16.65 10.65a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
