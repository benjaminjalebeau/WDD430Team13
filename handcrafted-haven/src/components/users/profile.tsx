import Link from 'next/link';
import { LoggedInUser } from '@/app/lib/definitions';

export default function Profile({ user }: { user: LoggedInUser }) {
    return (
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h1>
            <p className="text-sm text-gray-600 mb-2">
                <strong>Name:</strong> {user.name}
            </p>
            <p className="text-sm text-gray-600 mb-2">
                <strong>Email:</strong> {user.email}
            </p>
            {user.bio && (
                <p className="text-sm text-gray-600 mb-4">
                    <strong>Bio:</strong> {user.bio}
                </p>
            )}
            <div className="flex justify-end mt-6">
                <Link
                    href={`/profile/edit`}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#023047] rounded-lg hover:bg-[#219EBC] transition"
                    aria-label='Navigate to profile edit page.'
                >
                    Edit Profile
                </Link>
            </div>
        </div>
    );
}