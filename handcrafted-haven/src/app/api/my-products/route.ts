import { NextResponse } from "next/server";
import postgres from "postgres";
import { getUserData } from "@/app/lib/actions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function GET() {
  try {
    
    const user = await getUserData();

    // Check if the user is authenticated
    if (!user) {
      console.error("Unauthorized access: User is not authenticated.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
      WHERE user_id = ${user.id}
      ORDER BY listed_date DESC;
    `;

    const products = data.map((product) => ({
      ...product,
      // Convert amount from cents to dollars
      price: product.price / 100,
      formattedDate: product.listed_date.toISOString().split('T')[0],
    }));


    return NextResponse.json({ products });
  } catch (error: unknown) {
    // Narrow down the error type
    if (error instanceof Error) {
      console.error("Failed to fetch user's products:", error.message);
      return NextResponse.json(
        { error: "Failed to fetch products", details: error.message },
        { status: 500 }
      );
    }

    // Handle unexpected error types
    console.error("An unexpected error occurred:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}