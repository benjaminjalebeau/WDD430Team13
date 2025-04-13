'use client';

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Product from "@/components/Product";
import { ProductData } from "@/app/lib/definitions";

const ListingsPageContent: React.FC<{ page: number; searchQuery: string; minPrice: string; maxPrice: string; }> = ({ page, searchQuery, minPrice, maxPrice }) => {
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
        const response = await fetch(`/api/products?page=${page}&search=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
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
  }, [page, searchQuery, minPrice, maxPrice]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const minPrice = formData.get("minPrice") as string;
    const maxPrice = formData.get("maxPrice") as string;
    router.push(`/products?page=1&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
  };

  const handleNext = () => {
    if (hasNextPage) {
      router.push(`/products?page=${page + 1}&search=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      router.push(`/products?page=${page - 1}&search=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    }
  };

  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Our Products</h1>

      {/* Search Bar with Price Filters and For Sale Checkbox */}
      <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="w-full max-w-md flex">
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search products, descriptions or artisans..."
            className="w-full px-4 py-2 border rounded-l-lg text-sm"
          />
        </div>
        <input
          type="number"
          name="minPrice"
          defaultValue={minPrice}
          placeholder="Min Price"
          className="px-4 py-2 border rounded text-sm"
        />
        <input
          type="number"
          name="maxPrice"
          defaultValue={maxPrice}
          placeholder="Max Price"
          className="px-4 py-2 border rounded text-sm"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-[#023047] text-white rounded-lg hover:bg-[#219EBC] flex items-center justify-center"
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
              id={product.id}
              product_name={product.product_name}
              description={product.description}
              price={product.price}
              for_sale={product.for_sale}
              image_url={product.image_url}
              artisan_name={product.artisan_name}
              formattedDate={product.formattedDate}
            />
          ))}
        </div>
      )}

      {/* Pagination Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="bg-[#023047] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#219EBC] transition disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!hasNextPage}
          className="bg-[#023047] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#219EBC] transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default function SearchParamsWrapper() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";


  return <ListingsPageContent page={page} searchQuery={searchQuery} minPrice={minPrice} maxPrice={maxPrice} />;
};

