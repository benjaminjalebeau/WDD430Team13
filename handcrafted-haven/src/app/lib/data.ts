import postgres from 'postgres';

import { ProductForm, ReviewForm } from './definitions';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


//This returns a single product by it's product id.
export async function fetchProductById(id: string) {
    try {
      const data = await sql<ProductForm[]>`
        SELECT
          products.id,
          products.user_id,
          products.name,
          products.description,
          products.image_url,
          products.for_sale,
          products.sold,
          products.price
        FROM products
        WHERE products.id = ${id};
      `;
  
      const product = data.map((product) => ({
        ...product,
        // Convert amount from cents to dollars
        price: product.price / 100,
      }));

      return product[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch product.');
    }
}

//This returns a single review by it's review id.
export async function fetchReviewById(id: string) {
  try {
    const data = await sql<ReviewForm[]>`
      SELECT
        reviews.id,
        reviews.user_id,
        reviews.product_id,
        reviews.rating, 
        reviews.comments
      FROM reviews
      WHERE reviews.id = ${id};
    `;

    const review = data.map((review) => ({...review}));

    return review[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch review.');
  }
}
  