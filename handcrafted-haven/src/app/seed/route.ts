/*
    The following code is used to create our DB tables and insert our seed values stored
    in app/lib/placeholder-data.ts
*/

import bcrypt from 'bcryptjs'; // For encrypting passwords
import postgres from 'postgres';
import { users, products, reviews } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

//Each of the following functions, beside the GET function, act the same. 
async function seedUsers() {
    // Creates Table using SQL
    await sql`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        user_type VARCHAR(255) NOT NULL,
        bio VARCHAR(255)
        photoURL VARCHAR(255) DEFAULT './placeholder-profile.jpg'
        );
    `;
    //Pulls and iterates through data in seed file.
    const insertedUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            // Inserts data into the DB.
            return sql`
                INSERT INTO users (id, name, email, password, user_type, bio)
                VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.userType}, ${user.bio})
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    return insertedUsers;
}

async function seedReviews() {
    await sql `
        CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        rating INT NOT NULL,
        comments TEXT,
        date DATE NOT NULL
        );
    `;

    const insertedReviews = await Promise.all(
        reviews.map( 
            (review) => sql`
                INSERT INTO reviews (user_id, product_id, rating, comments, date)
                VALUES (${review.userId},${review.productId},${review.rating},${review.comments},${review.date})
                ON CONFLICT (id) DO NOTHING;
            `,
        )
    );

    return insertedReviews;
}

async function seedProducts() {
    await sql`
        CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        description VARCHAR(255) NOT NULL,
        user_id INT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        for_sale BOOL NOT NULL,
        sold BOOL NOT NULL,
        price INT NOT NULL,
        listed_date DATE NOT NULL
        );
    `;

    const insertedProducts = await Promise.all(
        products.map(
            (product) => sql`
                INSERT INTO products (description, user_id, image_url, for_sale, sold, price, listed_date)
                VALUES (${product.description},${product.userId},${product.imageURL},
                ${product.forSale},${product.sold},${product.price},${product.listedDate})
                ON CONFLICT (id) DO NOTHING;
            `,
        ),
    );

    return insertedProducts;
}

// This function is called with when the route /seed is entered in the URL. 
export async function GET() {
    try {
        //Runs all SQL queries
        await sql.begin(() => [
            seedUsers(),
            seedReviews(),
            seedProducts(),
        ]);


        return Response.json({ message: 'Database seeded and initialized +'}); // If successful.
    } catch (error) {
        return Response.json({ error }, { status: 500 }) // If there was an error
    }
}

