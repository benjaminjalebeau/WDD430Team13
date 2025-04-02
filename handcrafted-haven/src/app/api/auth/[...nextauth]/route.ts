import NextAuth from "next-auth"
import { authOptions } from "@/app/lib/auth-options";

//Sets up API Routes for authentication
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }