'use client';

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Product from "@/components/Product";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  forSale: boolean;
  imageURL: string;
}

const ListingsPageContent: React.FC<{ page: number; searchQuery: string }> = ({ page, searchQuery }) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false); // Track if there is a next page
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/products?page=${page}&search=${searchQuery}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products);

        // Check if there are more products for the next page
        setHasNextPage(data.products.length === 6); // Assuming 6 is the limit per page
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, searchQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    router.push(`/products/listings?page=1&search=${search}`);
  };

  const handleNext = () => {
    if (hasNextPage) {
      router.push(`/products/listings?page=${page + 1}&search=${searchQuery}`);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      router.push(`/products/listings?page=${page - 1}&search=${searchQuery}`);
    }
  };

  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Our Products</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex items-center">
        <div className="w-full max-w-md flex">
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-l-lg text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 flex items-center justify-center"
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

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      {/* Product Grid */}
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Product
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              forSale={product.forSale}
              imageURL={product.imageURL}
            />
          ))}
        </div>
      )}

      {/* Pagination Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!hasNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const ListingsPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<h3>Loading search parameters...</h3>}>
          <SearchParamsWrapper />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

const SearchParamsWrapper = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("search") || "";

  return <ListingsPageContent page={page} searchQuery={searchQuery} />;
};

export default ListingsPage;
