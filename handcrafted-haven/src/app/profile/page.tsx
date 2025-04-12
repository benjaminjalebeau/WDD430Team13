import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Profile from '@/components/users/profile';
import { getUserData } from '@/app/lib/actions';
import NotAuthorized from '@/components/NotAuthorized';

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
            <Footer />
        </div>
    );
}