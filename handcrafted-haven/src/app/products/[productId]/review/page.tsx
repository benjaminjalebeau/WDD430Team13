import {fetchProductDataById} from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { fetchReviewsByProductId } from '@/app/lib/reviews/actions';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Product from '@/components/Product';
import { getUserData } from '@/app/lib/actions';
import { ReviewView } from '@/app/lib/definitions';
import Link from 'next/link';



// I got this signature from reviews/create/page.tsx
export default async function Page( props: {params: Promise<{ productId: string }> }) {
    const params = await props.params;
    const id = params.productId;
    const product= await fetchProductDataById(id);
    const reviews = await fetchReviewsByProductId(id);
    const user = await getUserData();


    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar/>

                { /* display product */ }
                <div className="flex justify-center items-center mt-10 mb-10">
                    <div className="w-full max-w-md">
                        <Product
                        id={product.id}
                        product_name={product.product_name}
                        description={product.description}
                        price={product.price}
                        for_sale={product.for_sale}
                        image_url={product.image_url}
                        artisan_name={product.artisan_name}
                        formattedDate={product.formattedDate}  
                        />
                    </div>
                </div>

                { /* display reveiws for the product */ }
                <div className="max-w-3xl mx-auto mb-20">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold ">Reviews</h2>
                        <Link
                            href={`/products/${id}/review/create`}
                            className="py-2 px-2 text-sm font-medium text-white bg-[#023047] rounded-lg hover:bg-[#219EBC] transition"
                        >
                            Review Product
                        </Link>
                    </div>
                    <div className="space-y-6">
                        {reviews.length > 0 ? (
                            reviews.map((review: ReviewView) => (
                                <div key={review.id} className="p-4 border rounded-md bg-white shadow-sm">
                                  <div className="flex justify-between">
                                    <p className="text-sm text-gray-700 font-semibold mb-1">
                                        {review.user_name} — <span className="text-yellow-500">★ {review.rating}</span>
                                    </p>
                                    {/*Checks to see if logged user owns to review to reveal edit link.*/}
                                    {user && user.id.toString() === review.user_id.toString() ? (
                                        <>
                                        <Link
                                            href={`/products/${id}/review/${review.id}/edit`}
                                            className="text-blue-500 hover:underline mb-1 ">
                                            Edit

                                        </Link>
                                        </>
                                    ) : null}
                                  </div>
                                  <p className="text-gray-800">{review.comments}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Posted on {new Date(review.date).toLocaleDateString()}
                                  </p>
                                  
                                </div>
                              ))
                        ) : (
                            <p className="text-gray-600">No reviews yet for this product.</p>
                        )}
                    </div>
                </div>

            <Footer/>
        </div>
    )

}