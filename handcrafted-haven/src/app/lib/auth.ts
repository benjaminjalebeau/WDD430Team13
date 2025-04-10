import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";


// This allows session data(logged in user data in this case) to be accessed on server components.
export async function getAuthSession() {
    return await getServerSession(authOptions);
};



