import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Navbar /> {/* NavBar component */}
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Handcrafted Haven</h1>
        <p className="text-lg text-gray-700">
          Get started by editing <code className="bg-gray-200 px-2 py-1 rounded">src/app/page.tsx</code>.
        </p>
      </main>
      <Footer /> {/* Footer component */}
    </div>
  );
}
