import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Profile from '@/components/users/profile';
import { getUserData } from '@/app/lib/actions';

export default async function ProfilePage() {
    const user = await getUserData();

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col justify-between">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <p className="text-lg font-medium text-gray-700">You must be logged in to view this page.</p>
                </main>
                <Footer />
            </div>
        );
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
