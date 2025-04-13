import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CreateAccountForm from "@/components/CreateAccountForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account",
    description: "Create a new account to start using our services.",
};

export default function Page() {
    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <CreateAccountForm />
            </div>
            <Footer />
        </>
    )
}