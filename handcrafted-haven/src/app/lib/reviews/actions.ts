'use server';
/*** Actions just for products. ***/

import { z } from 'zod'; // for validation
import postgres from 'postgres';
import { getUserData } from '../actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

//DB connection
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


// Validation schema for adding or updating review forms.
const ReviewFormSchema = z.object({
    id: z.string(),
    userId: z.string(),
    productId: z.string(),
    rating: z.coerce.number( )
        .gte(1, {message: 'Your rating must be 1-5, whole numbers.'})
        .lte(5, {message: 'Your rating must be 1-5, whole numbers.'}).int(),
    comments: z.string({
        invalid_type_error: 'Please enter your comments for your review. Min 8 Characters',
    }).min(8, {message: 'Please enter your comments for your review. Min 8 Characters'}).max(80),
    date: z.string(),
});

// Intializes form Schemas to be used in creating and updating review functions. 
// Omitting values that will be automatically generated or populated.
const CreateReview = ReviewFormSchema.omit({id: true, userId: true, productId: true, date: true });
const UpdateReview = ReviewFormSchema.omit({id: true, userId: true, productId: true, date: true });


//Holds validation errors
export type State = {
    errors?: {
        comments?: string[];
        rating?: string[];
    };
    message?: string | null;
};



export async function createReview(
        productId: string, prevState: State, formData: FormData
    ) {
    //Checks and grabs logged in user data
    const userData = await getUserData();
    if (!userData) {throw new Error('Not Logged in, Unauthorized.');}

   

    //Validates form data using zod and CreateReview Schema
    const validatedFields = CreateReview.safeParse({
        comments: formData.get('comments'),
        rating: formData.get('rating'),
    });

    // Returns Validation fails if found.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to create review.'
        };
    }

    // If validation passed, pulls data from form and prepares values to be entered into db.
    const {comments, rating} = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];
    const userId = userData.id;

    //SQL for entering review in DB.
    try {
        await sql`
            INSERT INTO reviews (user_id, product_id, rating, comments, date)
            VALUES (${userId},${productId},${rating},${comments},${date})
        `;

    } catch (error) {
        return {
            message: 'Database Error: ' + error,
          }
    }
    // Revalidating is for making sure that cached/static pages are rerendered. 
    // Adjust URL to appropriate page once created. For now, it'll take you to home.
    revalidatePath(`/products/${productId}/review`);
    redirect(`/products/${productId}/review`);

};




export async function updateReview(
    reviewId: string,
    userId: string,
    productId: string,
    prevState: State,
    formData: FormData,
) {
    //Checks if logged in user matches user who made review.
    //Checks and grabs logged in user data
   

    const userData = await getUserData();
    if (!userData) {throw new Error('Not Logged in, Unauthorized.');}
    if (userId !== userData.id) {throw new Error('Review doesn\'t belong to you, Unauthorized.');}

    const validatedFields = UpdateReview.safeParse({
        comments: formData.get('comments'),
        rating: formData.get('rating'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Review',
        }
    }

    const {comments, rating} = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];
   

    try {
        await sql`
            UPDATE reviews
            SET rating = ${rating}, 
            comments = ${comments}, 
            date = ${date}
            WHERE id = ${reviewId}
        `;
    } catch (error) {
        return {message: 'Database Error: ' + error}
    }

    revalidatePath(`/products/${productId}/review`);
    redirect(`/products/${productId}/review`);
};

type Review = {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    comments: string;
    date: string | Date;
    user_name: string;
}

export async function fetchReviewsByProductId(productId: string): Promise<Review[]> {
    const id = Number(productId);
    const result = await sql<Review[]>`
        SELECT r.*, u.name AS user_name
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.product_id = ${id}
        ORDER BY r.date DESC
    `;
    return result;
};