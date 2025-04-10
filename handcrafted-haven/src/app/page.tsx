import Link from "next/link";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 
import Product from "../components/Product";
import Artisan from "../components/Artisan";
import { products, users } from "./lib/placeholder-data";

export default function Home() {
  // Get the 3 latest products (sorted by listedDate)
  const latestProducts = [...products]
    .sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime())
    .slice(0, 3);

  //This needs to be changed to get stuff from DB
  const artisans = users.filter((user) => user.userType === "seller");

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Navbar /> {/* NavBar component */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-12">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Beauty is Handmade
              </h1>
              <h2 className="text-2xl text-gray-600 mb-4">
                Welcome to Handcrafted Haven, where we support local artisans and connect them to you.
              </h2>
              <p className="text-gray-700">
                Discover one-of-a-kind products or join us as a partner artisan and showcase your creativity!
              </p>
              {/* Button. Link needs to be reviewed */}
              <Link
                href="/about"
                className="mt-4 inline-block bg-[#023047] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#219EBC] transition"
              >
                Learn More
              </Link>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              {/* Maybe add carrousel in the future */}
              <img
                src="/hero-vase.png"
                alt="Handcrafted Vase"
                className="w-full max-w-md"
              />
            </div>
          </div>
        </section>

        {/* Latest Products Section */}
        <section className="bg-gray-100 py-12">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-left">
              Explore Our Latest Products
            </h2>
            <h2 className="text-2xl text-gray-600 mb-4">
              Each piece is made with care and attention to detail.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestProducts.map((product) => (
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
          </div>
        </section>

        {/* Artisans Section */}
        <section className="bg-white py-12">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-left">
              Meet Our Artisans
            </h2>
            <h2 className="text-2xl text-gray-600 mb-12">
              They create functional or decorative items by hand, utilizing traditional techniques and specialized tools, working with materials like wood, metal, clay, textiles, or glass.
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {artisans.map((artisan) => (
                <Artisan key={artisan.id} name={artisan.name} photoURL={artisan.photoURL} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer /> {/* Footer component */}
    </div>
  );
}
