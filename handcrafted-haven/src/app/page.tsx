
//import Image from "next/image";
import Navbar from "@/components/Navbar"; // Adjusted the path to match the correct casing
// testing auth
import { auth } from '@root/auth';

export default async function Home() {
  const session = await auth();

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Navbar />
      <main className="text-center">
        <div>
          {session?.user ? (
            <>
            <span>Welcome {session.user.name}</span>
            </>
          ): (
            <span>not logged in</span>
          )}
        </div>
          
        <h1 className="text-4xl font-bold mb-4">Welcome to Handcrafted Haven</h1>
        <p className="text-lg text-gray-700">
          Get started by editing <code className="bg-gray-200 px-2 py-1 rounded">src/app/page.tsx</code>.
        </p>
      </main>
    </div>
  );
}
