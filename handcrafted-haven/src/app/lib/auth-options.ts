import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import type { LoggedInUser } from '@/app/lib/definitions';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

//Checks db for matching email.
export async function getUser(email: string): Promise<LoggedInUser | undefined> {
    try {
      const user = await sql<LoggedInUser[]>`SELECT * FROM users WHERE email=${email}`;
      return user[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
}

//Config options for next-auth. For right now, we have a simple provider that checks entered credentials against the DB
// We could also set up Oauth on Github easily as an alternative. 
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirect to custom login page
  },
  session: {
    strategy: "jwt",
  },
};