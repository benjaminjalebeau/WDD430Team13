import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchParamsWrapper from "@/components/products/all-products";
import { Suspense } from "react";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Products',
    description: 'Explore our wide range of handcrafted products.',
  };

export default async function Page() {

  return (
    <div className="min-h-screen flex flex-col justify-between">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<p>Loading search parameters...</p>}>
              <SearchParamsWrapper />
            </Suspense>
          </main>
          <Footer />
      </div>
  )
}