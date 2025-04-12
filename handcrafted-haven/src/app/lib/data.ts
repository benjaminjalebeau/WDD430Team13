import postgres from 'postgres';

import { ProductForm, ProductData, ReviewForm, User} from './definitions';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


//This returns a single product by it's product id.
export async function fetchProductById(id: string) {
    try {
      const data = await sql<ProductForm[]>`
        SELECT * FROM products WHERE products.id = ${id};
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

//This returns a single product by it's product id.
export async function fetchProductDataById(id: string) {
  try {
    const data = await sql<ProductData[]>`
      SELECT
        products.id,
        products.user_id,
        products.name AS product_name,
        products.description,
        products.image_url,
        products.for_sale,
        products.sold,
        products.price,
        products.listed_date,
        u.name AS artisan_name
      FROM products
      INNER JOIN users u ON products.user_id = u.id
      WHERE products.id = ${id};
    `;

    const product = data.map((product) => ({
      ...product,
      // Convert amount from cents to dollars
      price: product.price / 100,
      formattedDate: product.listed_date.toISOString().split('T')[0],
    }));

    return product[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function fetchProducts(){
  try {
    const data = await sql<ProductData[]>`
      SELECT
        products.id,
        products.user_id,
        products.name AS product_name,
        products.description,
        products.image_url,
        products.for_sale,
        products.sold,
        products.price,
        products.listed_date,
        u.name AS artisan_name
      FROM products
      INNER JOIN users u ON products.user_id = u.id
      ORDER BY listed_date DESC;
    `;

    const products = data.map((product) => ({
      ...product,
      // Convert amount from cents to dollars
      price: product.price / 100,
      formattedDate: product.listed_date.toISOString().split('T')[0],
    }));

    return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function fetchSellers(){
  try {
    const data = await sql<User[]>`
      SELECT * FROM users WHERE user_type = 'seller';
    `;
    const sellers = data.map((seller) => ({...seller}));

    return sellers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sellers.');
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
  