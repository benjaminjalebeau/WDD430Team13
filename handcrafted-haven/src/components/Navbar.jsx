'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Define the handleSearch function
  const handleSearch = (event) => {
    event.preventDefault();
    console.log('Search query:', searchQuery);
    router.push(`/products?page=1&search=${searchQuery}`);
    // Add additional logic for handling the search query if needed
    setSearchQuery('');
  };

  const links = [
    {name: 'Home', href: '/'},
    {name: 'Products', href: '/products'},
    {name: 'Artisans', href: '#'},
  ];

  return (
    <header className="bg-tertiary border-b-5 border-secondary">
      <nav className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">          
          <a href="/" className="text-xl font-bold text-gray-800 hover:text-gray-600">
            <Image 
             src="/images/logo-handcrafted-haven.png"
             width={250}
             height={58}
             alt="Handcrafted Haven"
            />
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
          <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:flex sm:items-center sm:space-x-4`}>
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block bg-primary text-gray-800 hover:bg-secondary px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            {/* Sign in or Out buttons */}
            {session ? (
              <>
                <button onClick={() => signOut()} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600">
                  Sign Out
                </button>
                <span className="mr-4">Hello, {session.user?.name}</span>
              </>
            ) : (
              <button onClick={() => signIn()} className="px-4 py-2 text-sm font-medium text-white bg-[#023047] rounded-lg hover:bg-[#219EBC]">
                Sign In
              </button>
            )}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex items-center space-x-2">
            <div className="w-full max-w-md flex">
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border rounded-l-lg text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#023047] text-white rounded-r-lg hover:bg-[#219EBC] flex items-center justify-center"
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
