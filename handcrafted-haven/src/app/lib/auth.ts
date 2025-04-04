import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";


//For restricting access to certain pages. Checks to see if any user is logged in.
export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  return session;
}

// This allows session data(logged in user data in this case) to be accessed on server components.
export async function getAuthSession() {
    return await getServerSession(authOptions);
};

