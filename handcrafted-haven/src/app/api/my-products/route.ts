// jL - Apparently, I can't do the authentication of this page based on the user type:

// import { NextResponse } from "next/server";
// import postgres from "postgres";
// import { getUserData } from "@/app/lib/actions";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// export async function GET() {
//   try {
//     console.log("Fetching user data...");
//     const user = await getUserData();

//     if (!user || user.userType !== "seller") {
//       console.error("Unauthorized access or user is not a seller.");
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     console.log("Fetching products for user:", user.id);
//     const products = await sql`
//       SELECT * FROM products WHERE user_id = ${user.id}
//     `;

//     console.log("Products fetched successfully:", products);
//     return NextResponse.json({ products });
//   } catch (error: any) {
//     console.error("Failed to fetch user's products:", error.message || error);
//     return NextResponse.json(
//       { error: "Failed to fetch products", details: error.message || error },
//       { status: 500 }
//     );
//   }
// }

/////////////////////////////////////////////////////////////////////////////////

// jL - This version authorizes all users:

// jL- For some reason, the products table is not being created. 
import { NextResponse } from "next/server";
import postgres from "postgres";
import { getUserData } from "@/app/lib/actions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function GET() {
  try {
    console.log("Fetching user data...");
    const user = await getUserData();

    // Check if the user is authenticated
    if (!user) {
      console.error("Unauthorized access: User is not authenticated.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Fetching products for user:", user.id);
    const products = await sql`
      SELECT * FROM products WHERE user_id = ${user.id}
    `;

    console.log("Products fetched successfully:", products);
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