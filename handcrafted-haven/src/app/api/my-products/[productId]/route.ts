import { NextResponse } from "next/server";
import postgres from "postgres";
import { getUserData } from "@/app/lib/actions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function DELETE( req: Request, context: { params: { productId: string } }) {
    try {
      const user = await getUserData();
      
  
      if (!user) {
        console.error("Unauthorized access: User is not authenticated.");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      console.log("User id and type: ", user.id, typeof user.id);
      // Getting a weird error here when I take out await. It works, but returns an error
      const { productId } = await context.params;
      if (productId) {console.log("Product ID: ", productId, typeof productId)};

      if (!productId) {
        return NextResponse.json(
          { error: "Product ID is required." },
          { status: 400 }
        );
      }

      // Check if the product belongs to the authenticated user
      const product = await sql`
        SELECT id FROM products WHERE id = ${productId} AND user_id = ${parseInt(user.id)};
      `;
  
      if (product.length === 0) {
        return NextResponse.json(
          { error: "Product not found or you do not have permission to delete it." },
          { status: 404 }
        );
      }
  
      // Delete the product
      await sql`
        DELETE FROM products WHERE id = ${productId};
      `;
  
      return NextResponse.json({ message: "Product deleted successfully." });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to delete product:", error.message);
        return NextResponse.json(
          { error: "Failed to delete product", details: error.message },
          { status: 500 }
        );
      }
  
      console.error("An unexpected error occurred:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }