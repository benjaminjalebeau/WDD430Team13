"use client";
import { useState } from "react"
import { useRouter } from "next/navigation";
import { createUser } from "../lib/actions";
import Navbar from "../../components/Navbar";


export default function CreateAccountPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [userType, setUserType] = useState<"basic" | "seller">("basic");
    const [bio, setBio] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // form validation on the client side for email and password matching
        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }
        if (password !== verifyPassword) {
            setError("Passwords do not match.");
            return;
        }

        // this will reset the errors after corrections are made
        setError("");
        console.log({ name, email, password, userType, bio });

        try {
            // this is going to the createUser function in lib/actions.ts
            const result = await createUser(name, email, password, userType, userType === "seller" ? bio : undefined);

            if (result.success) {
                router.push("/");
            } else {
                alert(result.message);
                router.push("/create-account");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error(err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <form 
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
                >
                    <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>

                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="w-full p-2 border rounded-md" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full p-2 border rounded-md" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="w-full p-2 border rounded-md" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    {/* Verify Password */}
                    <div className="mb-4">
                        <label htmlFor="verifyPassword" className="block text-sm font-medium">Verify Password</label>
                        <input 
                            type="password" 
                            id="verifyPassword" 
                            className="w-full p-2 border rounded-md" 
                            value={verifyPassword} 
                            onChange={(e) => setVerifyPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    {/* User Type */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">User Type</label>
                        <select 
                            value={userType} 
                            onChange={(e) => setUserType(e.target.value as "basic" | "seller")} 
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="basic">Basic</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>

                    {/* Bio (Only for Sellers) */}
                    {userType === "seller" && (
                        <div className="mb-4">
                            <label htmlFor="bio" className="block text-sm font-medium">Bio</label>
                            <textarea 
                                id="bio" 
                                className="w-full p-2 border rounded-md" 
                                value={bio} 
                                onChange={(e) => setBio(e.target.value)} 
                                required 
                            />
                        </div>
                    )}

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    {/* Submit Button */}
                    <div className="mt-6 flex justify-end">
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}