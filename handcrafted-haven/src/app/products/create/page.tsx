import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Form from "@/components/products/create-form";
import { requireAuth } from "@/app/lib/auth";

export default async function Page() {
    const session = await requireAuth();
    if (!session.user?.email) {
        return (
            <div>
                <p>Not Authorized.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar/>
            <main className="flex justify-center items-center mt-10 mb-10">
                <Form/>
                <button
                    type="submit"
                    className="bg-[#023047] text-white px-4 py-2 rounded-md hover:bg-[#219EBC] transition"
                >
                    Create Account
                </button>
            </main>
            <Footer/>
        </div>
    )
}