import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditProfileForm from '@/components/users/edit-form';
import { getUserData } from '@/app/lib/actions';
import NotAuthorized from '@/components/NotAuthorized';

// I know this is not the best way to do it, but I don't know how to change it

export default async function Page() {
    const user = await getUserData();

    if (!user || user.user_type === 'basic' ) {
        return <NotAuthorized />;
    }

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            <main className="flex justify-center items-center mt-10 mb-10">
                <EditProfileForm user={user} />
            </main>
            <Footer />
        </div>
    );
}