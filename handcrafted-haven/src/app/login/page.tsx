"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/"
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
  };

  return (

    <div className="min-h-screen flex flex-col justify-between" >
        <Navbar/>
        <main className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full my-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full my-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#023047] text-white p-2 rounded w-full hover:bg-[#219EBC] transition"
                >
                  Sign In
                </button>

                { /* Link to Create Account Page */ }
                <p className="text-sm mt-4 text-center">
                  Don&apos;t have an account? No problem!{" "}
                  <Link href="/create-account" className="text-blue-600 hover:underline">
                    Create Account
                  </Link>
                </p>
            </form>

        </main>
      
    <Footer/>
    </div>
    
  );
}