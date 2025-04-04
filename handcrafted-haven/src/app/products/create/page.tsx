
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Form from "@/components/products/create-form";
import { requireAuth } from "@/app/lib/auth";

export default async function page() {
    const session = await requireAuth();

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar/>
            <main className="flex justify-center items-center mt-10 mb-10">
                <Form/>
            </main>
            <Footer/>
        </div>
    )
}