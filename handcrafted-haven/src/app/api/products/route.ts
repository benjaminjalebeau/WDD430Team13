import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const search = searchParams.get("search") || "";
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) * 100 : 0;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) * 100 : 2147483647;

    const limit = 6; // Number of products per page
    const offset = (page - 1) * limit;

    // Query to fetch products with optional search
    const data = await sql`
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
      WHERE (
        description ILIKE ${"%" + search + "%"} 
        OR products.name ILIKE ${"%" + search + "%"} 
        OR u.name ILIKE ${"%" + search + "%"}
        )
        AND products.price >= ${minPrice}
        AND products.price <= ${maxPrice}
      ORDER BY listed_date DESC
      LIMIT ${limit} OFFSET ${offset};
    `;

    const products = data.map((product) => ({
      ...product,
      // Convert amount from cents to dollars
      price: product.price / 100,
      formattedDate: product.listed_date.toISOString().split('T')[0],
    }));

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
