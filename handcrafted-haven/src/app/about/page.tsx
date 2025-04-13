import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn more about Handcrafted Haven, our mission, and what makes us unique.',
  };
export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
            <Navbar /> {/* Navbar Component */}
            <main className="flex-grow">
                {/* Title Section */}
                <section className="bg-white py-40">
                    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Handcrafted Haven
                        </h1>
                        <h2 className="text-2xl text-gray-600 mb-4">
                        Revolutionize the way handcrafted items are discovered, appreciated, and acquired.
                        </h2>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="bg-gray-100 py-40">
                    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
                        {/* Mission Text */}
                        <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            An innovative web application for art enthusiasts!
                            </h2>
                            <p className="text-gray-700 text-lg">
                            Handcrafted Haven is an innovative web application that aims to provide a platform for artisans 
                            and crafters to showcase and sell their unique handcrafted items. It serves as a virtual marketplace, 
                            connecting talented creators with potential customers who appreciate the beauty and quality of 
                            handmade products. 
                            </p>
                        </div>

                        {/* Logo */}
                        <div className="lg:w-1/2 flex justify-center">
                            <img
                                src="/logo-square-symbol.png" 
                                alt="Handcrafted Haven Logo Detail"
                                className="w-64 h-auto"
                            />
                        </div>
                    </div>
                </section>

                {/* Handcrafted Haven in Numbers Section */}
                <section className="bg-white py-40">
                    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-20">
                            Handcrafted Haven in Numbers
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {/* Creative products */}
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold text-[#C26800] mb-4">50+ Creative Products</h3>
                                <p className="text-base text-gray-700 leading-6">Explore artistic creations that embody the charm and craftsmanship of handmade products, where beauty meets quality in every detail.</p>
                            </div>

                            {/* Passionate Sellers */}
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold text-[#C26800] mb-4">15+ Passionate Sellers</h3>
                                <p className="text-base text-gray-700 leading-6">A thriving community of passionate creators and conscious sellers, dedicated to craftsmanship, 
                                authenticity, and purpose-driven work.</p>
                            </div>

                            {/* Visitors */}
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold text-[#C26800] mb-4">1000+ Visitors</h3>
                                <p className="text-base text-gray-700 leading-6">Reach a global audience of passionate, conscious consumers who value quality, 
                                authenticity, and sustainability.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer /> {/* Footer Component */}
        </div>
    );
}