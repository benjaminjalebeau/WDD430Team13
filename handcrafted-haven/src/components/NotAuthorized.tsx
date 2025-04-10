'use client';
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function NotAuthorized() {

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar/>
            <main className="flex justify-center items-center">
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Not Authorized</h2>
                    <p>Please sign in with an authorized account to view this page.</p>
                </div>        
            </main>
            <Footer/>
        </div>
    );
}