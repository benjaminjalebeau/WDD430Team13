'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { useState } from 'react';
import { EditState, updateUser } from '@/app/lib/users/actions';
import { LoggedInUser } from '@/app/lib/definitions';

export default function EditProfileForm({ user }: { user: LoggedInUser }) {
    const router = useRouter(); 
    const [state, setState] = useState<EditState>({ message: null, errors: {} });
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        bio: user.bio || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await updateUser(user.id, formData);

        if (result.success) {
            setState({ message: result.message, errors: {} });
            router.push('/profile');
        } else {
            setState({
                message: result.message,
                errors: Object.fromEntries(
                    Object.entries(result.errors || {}).map(([key, value]) => [
                        key,
                        Array.isArray(value) ? value : value._errors || [],
                    ])
                ),
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-3/4 max-w-md">
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* User Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                        Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            aria-describedby="name-error"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                    </div>
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.name &&
                            state.errors.name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* User Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                        Email
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            aria-describedby="email-error"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                    </div>
                    <div id="email-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.email &&
                            state.errors.email.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* User Bio */}
                <div className="mb-4">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-900">
                        Bio
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={3}
                            aria-describedby="bio-error"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                        />
                    </div>
                    <div id="bio-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.bio &&
                            state.errors.bio.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="mt-6 flex justify-end gap-4">
                    <Link
                        href="/profile"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-[#023047] rounded-lg hover:bg-[#219EBC] transition"
                    >
                        Update
                    </button>
                </div>
            </div>
        </form>
    );
}