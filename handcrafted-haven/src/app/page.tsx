import Link from "next/link";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 

export default function Home() {
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
  className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
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
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Handcrafted Haven</h1>
          <p className="text-lg text-gray-700">
            Get started by editing <code className="bg-gray-200 px-2 py-1 rounded">src/app/page.tsx</code>.
          </p>
        </div>
      </main>
      <Footer /> {/* Footer component */}
    </div>
  );
}
