import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const search = searchParams.get("search") || "";

    const limit = 6; // Number of products per page
    const offset = (page - 1) * limit;

    // Query to fetch products with optional search
    const products = await sql`
      SELECT * FROM products
      WHERE description ILIKE ${"%" + search + "%"}
      ORDER BY listed_date DESC
      LIMIT ${limit} OFFSET ${offset};
    `;

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
