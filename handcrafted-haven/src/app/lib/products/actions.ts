'use server';
/*** Actions just for products. ***/

import { z } from 'zod'; // for validation
import postgres from 'postgres';
import { getUserData } from '../actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

//DB connection
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


// Validation schema for adding or updating product forms.
const ProductFormSchema = z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string({
        invalid_type_error: 'Please enter a name for your product.',
    }).min(1, {message: 'Please enter a name for your product.'}),
    description: z.string({
        invalid_type_error: 'Please enter a description for your product. Min 8 Characters',
    }).min(8, {message: 'Please enter a description for your product. Min 8 Characters'}).max(80),
    //I'm not sure how we will be adding images to the app yet, so change this when figured out. For now it takes a path.
    imageURL: z.string({
        invalid_type_error: 'Please enter the img url/path for your product',
    }).min(1, {message: 'Please enter the img url/path for your product'}),
    forSale: z.boolean({
        required_error: "forSale is required",
        invalid_type_error: 'forSale must be a boolean',
    }),
    sold: z.boolean({
        required_error: "sold is required",
        invalid_type_error: 'sold must be a boolean',
    }),
    price: z.coerce.number()
    .gte(0, {message: 'Please enter a price greater than $0.'}).optional().default(0),
    listedDate: z.string(),
});

// Intializes form Schemas to be used in creating and updating product functions. 
// Omitting values that will be automatically generated or populated.
const CreateProduct = ProductFormSchema.omit({id: true, userId: true, listedDate: true, sold: true });
const UpdateProduct = ProductFormSchema.omit({id: true, userId: true, listedDate: true });

//Holds validation errors
export type State = {
    errors?: {
        name?: string[];
        description?: string[];
        imageURL?: string[];
        forSale?: string[];
        price?: string[];
    };
    message?: string | null;
};

export type EditState = {
    errors?: {
        name?: string[];
        description?: string[];
        imageURL?: string[];
        forSale?: string[];
        price?: string[];
    };
    message?: string | null;
};


export async function createProduct(prevState: State, formData: FormData) {
    //Checks and grabs logged in user data
    const userData = await getUserData();
    if (!userData) {throw new Error('Not Logged in, Unauthorized.');}

    //Validates form data using zod and CreateProduct Schema
    const validatedFields = CreateProduct.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        imageURL: formData.get('imageURL'),
        forSale: formData.get('forSale') === 'on',
        price: formData.get('price'),
    });

    // Returns Validation fails if found.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to create product.'
        };
    }

    // If validation passed, pulls data from form and prepares values to be entered into db.
    const {name, description, imageURL, forSale, price} = validatedFields.data;
    const priceInCents = price * 100;
    const listedDate = new Date().toISOString().split('T')[0];
    const userId = userData.id;
    const sold = false;

    //SQL for entering product in DB.
    try {
        await sql`
            INSERT INTO products (name, description, user_id, image_url, for_sale, sold, price, listed_date)
            VALUES (${name}, ${description},${userId},${imageURL},${forSale},${sold},${priceInCents},${listedDate})
        `;

    } catch (error) {
        return {
            message: 'Database Error: ' + error,
          }
    }
    // Revalidating is for making sure that cached/static pages are rerendered. 
    // Adjust URL to appropriate page once created. For now, it'll take you to home.
    revalidatePath('/profile');
    redirect('/profile');

};

//Functions the same as createProduct, with different SQL and an added sold boolean.
export async function updateProduct(
    id: string,
    prevState: EditState,
    formData: FormData,
) {
    const validatedFields = UpdateProduct.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        imageURL: formData.get('imageURL'),
        forSale: formData.get('forSale') === 'on',
        sold: formData.get('sold') === 'on',
        price: formData.get('price'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Product',
        }
    }

    const { name, description, imageURL, forSale, sold, price } = validatedFields.data;
    const priceInCents = price * 100;

    try {
        await sql`
            UPDATE products
            SET name = ${name}, 
            description = ${description}, 
            image_url = ${imageURL}, 
            for_sale = ${forSale}, 
            sold = ${sold}, 
            price = ${priceInCents}
            WHERE id = ${id}
        `;
    } catch (error) {
        return {message: 'Database Error: ' + error}
    }

    revalidatePath('/products');
    redirect('/products');
};