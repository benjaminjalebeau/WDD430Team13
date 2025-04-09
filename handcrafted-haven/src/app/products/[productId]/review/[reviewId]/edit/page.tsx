import Form from '@/components/reviews/edit-form';
import {fetchReviewById} from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function Page( props: {params: Promise<{ reviewId: string }> }) {
    const params = await props.params;
    const id = params.reviewId;
    console.log('Page Review Id: ' + id);
    console.log(id);
    const review= await fetchReviewById(id);

    if (!review) {
        notFound();
    }

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