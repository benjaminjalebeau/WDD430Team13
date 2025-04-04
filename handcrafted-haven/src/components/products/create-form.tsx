'use client';

import Link from 'next/link';

import { createProduct, State } from '@/app/lib/products/actions';
import { useActionState } from 'react';

//Form for adding new products.
export default function Form() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(createProduct, initialState);

    
    return (
        <form action={formAction} className="w-3/4 max-w-md">
            <div className="rounded-md bg-gray-50 p-4 md:p-6 ">
                {/* Product Name */}
                
                <div className="mb-4"> 
                    <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                        Product Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            aria-describedby='name-error'
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

                {/* Product Description */}
                <div className="mb-4"> 
                    <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                        Product Description
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            aria-describedby='description-error'
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                    </div>

                    <div id="description-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.description &&
                        state.errors.description.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Image URL */}
                <div className="mb-4"> 
                    <label htmlFor="imageURL" className="block text-sm/6 font-medium text-gray-900">
                        Image Path/URL
                    </label>
                    <div className="mt-4">
                        <input
                            id="imageURL"
                            name="imageURL"
                            type="text"
                            aria-describedby='image-error'
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                    </div>

                    <div id="image-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.imageURL &&
                        state.errors.imageURL.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>
                </div>

                {/* For Sale CheckBox */}
                <div className="mb-4"> 
                    <div className="flex items-center space-x-2">
                        <label htmlFor="forSale" className="block text-sm/6 font-medium text-gray-900">
                            Is this item for sale?
                        </label>
                        <input
                            id="forSale"
                            name="forSale"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-200 rounded"
                            onChange={(e)=> {
                                const priceInput = document.getElementById('price') as HTMLInputElement;
                                priceInput.disabled = !e.target.checked;
                                priceInput.required = e.target.checked;
                            }}
                        />
                    </div>

                    <div id="forSale-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.forSale &&
                        state.errors.forSale.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Product Price */}
                <div className="mb-4"> 
                <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                        Item Price
                    </label>
                    <div className="mt-4">
                        <input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            placeholder="Enter USD amount"
                            aria-describedby='price-error'
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                            disabled
                        />
                        
                    </div>

                    <div id="price-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.price &&
                        state.errors.price.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    {/*Need to update this link to artisan's product page when added*/}
                    <Link
                    
                    href="/"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                    Cancel
                    </Link>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">Submit</button>
                </div>
            </div>
        </form>
    )
}

