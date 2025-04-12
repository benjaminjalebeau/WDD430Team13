import Navbar from "../../components/Navbar";
import { Metadata } from 'next';
import Footer from "../../components/Footer";
import Image from "next/image";

export const metadata: Metadata = {
    title: 'About us | Handcrafted Haven project',
    description: ''
  };


const AboutPage = () => {

    return (


        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <main className="flex-grow">
                    <section className="py-14 lg:py-24 relative z-0 bg-gray-50">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
                            <h1
                                className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-primary-300 mb-5 md:text-5xl md:leading-normal">
                                Handcrafted <span className="text-secondary">Haven</span>
                            </h1>
                            <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
                            Revolutionize the way handcrafted items are discovered, appreciated, and acquired.</p>

                        </div>
                    </section>

                    <section className="py-14 lg:py-24 relative">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 ">

                                <div className="lg:pr-24 flex items-justify">
                                    <div className="w-full">
                                        <Image 
                                            src="/images/logo-square-symbol.png" alt="About Us Handcrafted Haven"
                                            width={350}
                                            height={350}
                                            className="block lg:hidden mb-9 mx-auto object-cover"
                                            />
                                        <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center">
                                            Innovative web application for passionate of arts</h2>
                                        <p className="font-normal text-xl leading-8 text-black max-lg:text-center max-w-2xl mx-auto">
                                            Handcrafted Haven is an innovative web application that aims to provide a platform for artisans 
                                            and crafters to showcase and sell their unique handcrafted items. It serves as a virtual marketplace, 
                                            connecting talented creators with potential customers who appreciate the beauty and quality of 
                                            handmade products. 
                                        </p>

                                    </div>
                                </div>
                                <div className="img-box">                                
                                    <Image 
                                        src="/images/logo-square-symbol.png" alt="About Us Handcrafted Haven"
                                        width={350}
                                        height={350}
                                        className="hidden lg:block object-cover"
                                        />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-20 bg-white">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h2 className="font-manrope text-4xl text-center text-gray-900 font-bold mb-14">Handcrafted Haven in numbers</h2>
                            <div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between">
                                <div
                                    className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
                                    <div className="flex gap-5">
                                        <div className="font-manrope text-2xl font-bold text-secondary">
                                            +50
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xl text-gray-900 font-semibold mb-2">Creative arts</h4>
                                            <p className="text-xs text-gray-500 leading-5">Explore artistic creations that embody the charm and craftsmanship of handmade products, where beauty meets quality in every detail.</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
                                    <div className="flex gap-5">
                                        <div className="font-manrope text-2xl font-bold text-secondary">
                                            15+
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xl text-gray-900 font-semibold mb-2">Passionate Sellers</h4>
                                            <p className="text-xs text-gray-500 leading-5">
                                            A thriving community of passionate creators and conscious sellers, dedicated to craftsmanship, 
                                            authenticity, and purpose-driven work.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
                                    <div className="flex gap-5">
                                        <div className="font-manrope text-2xl font-bold text-secondary">
                                            1000+
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xl text-gray-900 font-semibold mb-2">Visitors consumers</h4>
                                            <p className="text-xs text-gray-500 leading-5">Reach a global audience of passionate, conscious consumers who value quality, 
                                                authenticity, and sustainability..</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>
                
            </div>
            <Footer />
        </>

    )
} 

export default AboutPage