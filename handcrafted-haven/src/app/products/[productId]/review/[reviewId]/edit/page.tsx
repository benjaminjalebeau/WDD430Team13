import Form from '@/components/reviews/edit-form';
import {fetchReviewById} from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getUserData } from "@/app/lib/actions";
import NotAuthorized from "@/components/NotAuthorized";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Review",
  description: "Edit your review.",
};

export default async function Page( props: {params: Promise<{ reviewId: string }> }) {
    const params = await props.params;
    const id = params.reviewId;
    const review= await fetchReviewById(id);

    if (!review) {
        notFound();
    }

    const user = await getUserData();
    if (!user || user.id !== review.user_id) {
        return (
            <NotAuthorized/>
        )
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar/>
            <main className="flex justify-center items-center mt-10 mb-10">
                <Form review={review}/>
            </main>
            <Footer/>
        </div>
    )

}