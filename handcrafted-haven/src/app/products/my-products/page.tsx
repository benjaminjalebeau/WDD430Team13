import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserProducts from "@/components/products/user-products";
import { getUserData } from "@/app/lib/actions";
import NotAuthorized from "@/components/NotAuthorized";

export default async function Page() {
  const user = await getUserData();
      if (!user || user.user_type === "basic") {
          return (
              <NotAuthorized/>
          )
      };


  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <UserProducts />
      <Footer />
    </div>
  )
}