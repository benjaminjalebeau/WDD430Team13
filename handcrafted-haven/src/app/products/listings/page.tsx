'use client';

import React, { useState, useEffect } from "react";
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

const ListingsPage = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("search") || "";

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
    router.push(`/products/listings?page=${page + 1}&search=${searchQuery}`);
  };

  const handlePrevious = () => {
    if (page > 1) {
      router.push(`/products/listings?page=${page - 1}&search=${searchQuery}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Our Products</h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search products..."
              className="w-full px-4 py-2 border rounded-lg text-sm"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </form>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-6">{error}</p>}

          {/* Product Grid */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Product
                  key={product.id}
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
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListingsPage;
