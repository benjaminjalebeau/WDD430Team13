'use server';

import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Initialize PostgreSQL connection
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Schema for validation
const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    userType: z.enum(['basic', 'seller']),
    bio: z.string().max(500).optional(),
    photoURL: z.string().url("Invalid URL").optional(),
});

// Define EditState type
export type EditState = {
    message: string | null;
    errors: Record<string, string[]>;
};

// Function to update user
export async function updateUser(
    userId: number,
    data: { name?: string; email?: string; bio?: string; photoURL?: string }
) {
    try {
        // Validate input data
        const parseResult = userSchema.partial().safeParse(data);

        if (!parseResult.success) {
            const errors = parseResult.error.format();
            return {
                success: false,
                message: 'Validation failed',
                errors,
            };
        }

        // Update user in the database
        await sql`
            UPDATE users
            SET
                name = ${data.name || null},
                email = ${data.email || null},
                bio = ${data.bio || null},
                photo_url = ${data.photoURL || null}
            WHERE id = ${userId}
        `;

        return { success: true, message: 'User updated successfully' };
    } catch (error) {
        console.error('Error updating user:', error);
        return { success: false, message: 'Failed to update user' };
    }
}

// Function to create a user
export async function createUser(
    name: string,
    email: string,
    password: string,
    userType: 'basic' | 'seller',
    bio?: string
) {
    const parseResult = userSchema.safeParse({ name, email, password, userType, bio });

    if (!parseResult.success) {
        const errors = parseResult.error.format();
        return {
            success: false,
            message: 'Validation failed',
            errors,
        };
    }

    try {
        // Check if the email already exists in the database
        const existingUser = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;

        if (existingUser.length > 0) {
            return {
                success: false,
                message: 'An account with this email already exists.',
            };
        }

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