import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditProfileForm from '@/components/users/edit-form';
import { getUserData } from '@/app/lib/actions';
import NotAuthorized from '@/components/NotAuthorized';

export default async function Page({ params }: { params: { userId: string } }) {
    const user = await getUserData();

    // Check if the user is logged in and authorized
    if (!user || user.user_type === 'basic' || user.id.toString() !== params.userId) {
        return <NotAuthorized />;
    }

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            <main className="flex justify-center items-center mt-10 mb-10">
                <EditProfileForm user={{ ...user, id: Number(user.id) }} />
            </main>
            <Footer />
        </div>
    );
}