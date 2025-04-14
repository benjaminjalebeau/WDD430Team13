import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Form from "@/components/products/create-form";
import { getUserData } from "@/app/lib/actions";
import NotAuthorized from "@/components/NotAuthorized";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Create Product",
    description: "Create a new product to start selling.",
};

export default async function Page() {
    
    //Checks logged in user for authentication
    const user = await getUserData();
    if (!user || user.user_type === "basic") {
        return (
            <NotAuthorized/>
        )
    };

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