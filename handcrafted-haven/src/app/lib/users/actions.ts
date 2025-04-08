'use server';

import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// am I calling this correctly?
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// schema for validation. I can list the errors to be what I want
const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    userType: z.enum(['basic', 'seller']),
    bio: z.string().max(500).optional()
  });

export async function createUser(name: string, email: string, password: string, userType: 'basic' | 'seller', bio?: string) {

    const parseResult = userSchema.safeParse({ name, email, password, userType, bio });

    if (!parseResult.success) {
        const errors = parseResult.error.format();
        return {
            success: false, 
            message: 'Validation failed', 
            errors
        };
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await sql`
            INSERT INTO users (name, email, password, user_type, bio)
            VALUES (${name}, ${email}, ${hashedPassword}, ${userType}, ${bio || null})
        `;

        return { success: true, message: 'User created successfully' };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: 'Failed to create user' };
    }
}
