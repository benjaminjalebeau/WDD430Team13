import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Form from "@/components/products/create-form";
import { getUserData } from "@/app/lib/actions";
import NotAuthorized from "@/components/NotAuthorized";

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