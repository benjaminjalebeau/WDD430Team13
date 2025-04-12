import Link from "next/link";
import Navbar from "../../components/Navbar"; 
import Footer from "../../components/Footer"; 
import Image from 'next/image';
import Head from 'next/head';



const ProductPage = () => {

    return (
        <>
            <Head>
                <title>
                    Product page
                </title>
                <meta
                name="description"
                content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
                key="desc"
                />
            </Head>
            <div className="min-h-screen flex flex-col justify-between bg-gray-100">
              <Navbar /> {/* NavBar component */}
              <main className="flex-grow">

                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">New products</h2>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            <div className="group relative">
                                
                                <Image 
                                    src="/images/products/product-06.jpg"
                                    alt="Front of men&#039;s Basic Tee in black." 
                                    width={250}
                                    height={150}
                                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                />
                                <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                    <a href="#">
                                        <span aria-hidden="true" className="absolute inset-0"></span>
                                        Needle felted mouse
                                    </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">Decoration</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">$45.00</p>
                                </div>
                            </div>
                            <div className="group relative">
                                
                                <Image 
                                    src="/images/products/product-02.webp"
                                    alt="Front of men&#039;s Basic Tee in black." 
                                    width={250}
                                    height={150}
                                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                />
                                <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                    <a href="#">
                                        <span aria-hidden="true" className="absolute inset-0"></span>
                                        Ceramic handmade coffee tea cup
                                    </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">Ceramic</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">$35</p>
                                </div>
                            </div>
                            <div className="group relative">
                                
                                <Image 
                                    src="/images/products/product-03.jpg"
                                    alt="Front of men&#039;s Basic Tee in black." 
                                    width={250}
                                    height={150}
                                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                />
                                <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                    <a href="#">
                                        <span aria-hidden="true" className="absolute inset-0"></span>
                                        Home made candles
                                    </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">Decoration</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">$45.00</p>
                                </div>
                            </div>
                            <div className="group relative">
                                
                                <Image 
                                    src="/images/products/product-04.jpg"
                                    alt="Front of men&#039;s Basic Tee in black." 
                                    width={250}
                                    height={150}
                                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                />
                                <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                    <a href="#">
                                        <span aria-hidden="true" className="absolute inset-0"></span>
                                        Black and white dotting stone
                                    </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">Decoration</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">$37.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
              </main>
              <Footer /> {/* Footer component */}
            </div>
        </>
    )

}

export default ProductPage