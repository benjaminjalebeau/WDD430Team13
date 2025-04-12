import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchParamsWrapper from "@/components/products/all-products";
import { Suspense } from "react";

export default async function Page() {

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
  )
}