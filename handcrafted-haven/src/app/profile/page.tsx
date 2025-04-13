import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Profile from '@/components/users/profile';
import { getUserData } from '@/app/lib/actions';
import UserProducts from "@/components/products/user-products";
import NotAuthorized from '@/components/NotAuthorized';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Profile',
  };

export default async function ProfilePage() {
    const user = await getUserData();

    if (!user) {
        return <NotAuthorized />; 
    }

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            <main className="flex-grow flex flex-col items-center justify-center p-6">
                <Profile user={user} />
            </main>
            {user.user_type === 'seller' ? (
                <UserProducts />
            ) : null}
            
            <Footer />
        </div>
    );
}