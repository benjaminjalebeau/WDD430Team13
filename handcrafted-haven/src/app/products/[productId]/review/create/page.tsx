import Form from '@/components/reviews/create-form';
import {fetchProductById} from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function Page( props: {params: Promise<{ productId: string }> }) {
    const params = await props.params;
    const id = params.productId;
    console.log(id);
    const product= await fetchProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar/>
            <main className="flex justify-center items-center mt-10 mb-10">
                <Form productId={id}/>
            </main>
            <Footer/>
        </div>
    )

}