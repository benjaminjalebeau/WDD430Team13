'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductData } from "@/app/lib/definitions";
import Product from "@/components/Product";



export default function UserProducts() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMyProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/my-products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load your products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  const handleUpdate = (productId: string) => {
    router.push(`/products/${productId}/edit`);
  };

  const handleDelete = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete product.");
        }
        setProducts(products.filter((product) => product.id !== productId));
      } catch (err) {
        console.error(err);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  return (
    
      <main className="flex-grow">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">My Products</h1>

          {error && <p className="text-red-500 text-center mb-6">{error}</p>}

          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="relative border rounded-lg shadow-md p-4 bg-white">
                  <Product
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    for_sale={product.for_sale}
                    image_url={product.image_url}
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleUpdate(product.id)}
                      className="px-3 py-1 text-sm font-medium text-white bg-[#023047] rounded-lg hover:bg-[#219EBC] transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
  );
}
