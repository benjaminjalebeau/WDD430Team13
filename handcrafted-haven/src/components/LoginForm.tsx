"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function LoginForm() {
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

    
            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h2  className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <label htmlFor="email" className="sr-only">Login</label>
                <input
                type="email"
                name="email"
                placeholder="Email"
                className="border p-2 w-full my-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                name="password"
                type="password"
                placeholder="Password"
                className="border p-2 w-full my-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#023047] text-white p-2 rounded w-full hover:bg-[#219EBC] transition"
                  aria-label="Sign into your account."
                >
                  Sign In
                </button>

                { /* Link to Create Account Page */ }
                <p className="text-sm mt-4 text-center">
                  Don&apos;t have an account? No problem!{" "}
                  <Link 
                    href="/create-account" 
                    className="text-blue-600 hover:underline"
                    aria-label="Link to create an account."
                  >
                    Create Account
                  </Link>
                </p>
            </form>

        
    
  );
}