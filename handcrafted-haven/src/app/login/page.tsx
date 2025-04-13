import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account.",
};

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-between" >
        <Navbar/>
        <main className="flex justify-center items-center">
            <LoginForm/>
        </main>    
    <Footer/>
    </div>
  )
}