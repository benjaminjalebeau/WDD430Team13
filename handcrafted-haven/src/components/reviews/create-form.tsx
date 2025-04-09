'use client';

import Link from 'next/link';

import { createReview, State } from '@/app/lib/reviews/actions';
import { useActionState, useState } from 'react';

//Form for adding new products.
export default function Form({productId} : {productId: string}) {
    const initialState: State = { message: null, errors: {} };
    const createReviewWithProductId = createReview.bind(null, productId)
    const [state, formAction] = useActionState(createReviewWithProductId, initialState);
    const [rating, setRating] = useState(5);

    
    return (
        <form action={formAction} className="w-3/4 max-w-md">
            <div className="rounded-md bg-gray-50 p-4 md:p-6 ">
                {/* Review Rating */}
                <div className="w-full">
                    <div className="price-range mb-4">
                        <span className="text-yellow-500 text-1xl">★ </span>
                        <span className="text-sm">Rating (1-5) : </span>
                        <span id="rating-span" className="text-sm">{rating}</span>
                        <input 
                            className="w-full accent-indigo-600" 
                            type="range" 
                            name="rating" 
                            defaultValue="5" 
                            min="1" 
                            max="5" 
                            onChange={(e)=> {setRating(Number(e.target.value))}}
                        />
                        <div className="-mt-2 flex w-full justify-between">
                        <span className="text-sm text-gray-600">1</span>
                        <span className="text-sm text-gray-600">5</span>
                        </div>
                    </div>
                </div>


                {/* Review Comments */}
                <div className="mb-4"> 
                    <label htmlFor="comments" className="block text-sm/6 font-medium text-gray-900">
                        Review Comments
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="comments"
                            name="comments"
                            rows={3}
                            aria-describedby='comments-error'
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                    </div>

                    <div id="comments-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.comments &&
                        state.errors.comments.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>
                </div>
                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-4">
                    {/*Need to update this link to artisan's product page when added*/}
                    <Link
                    
                    href="/"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                    Cancel
                    </Link>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">Post</button>
                </div>

            </div>
            
        </form>
    )
}

