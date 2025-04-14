import Link from 'next/link';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Could not find the requested product.",
};


export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested product.</p>
      {/*Update this link */}
      <Link
        href="/"
        className="mt-4 rounded-md bg-[#023047] px-4 py-2 text-sm text-white transition-colors hover:bg-[#219EBC]"
      >
        Go Back
      </Link>
    </main>
  );
}