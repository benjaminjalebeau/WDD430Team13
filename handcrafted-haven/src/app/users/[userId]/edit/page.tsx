import EditProfileForm from '@/components/users/edit-form';
import { users } from '@/app/lib/placeholder-data'; // Replace with your actual data fetching logic
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: { userId: string } }) {
    const { userId } = props.params;

    // Fetch the user data (replace this with your actual database query)
    const user = users.find((u) => u.id.toString() === userId);

    if (!user) {
        notFound();
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