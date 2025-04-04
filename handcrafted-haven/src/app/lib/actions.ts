'use server';

import postgres from 'postgres';
import bcrypt from 'bcryptjs';

// am I calling this correctly?
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function createUser(name: string, email: string, password: string, userType: 'basic' | 'seller', bio?: string) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await sql`
            INSERT INTO users (name, email, password, userType, bio)
            VALUES (${name}, ${email}, ${hashedPassword}, ${userType}, ${bio || null})
        `;

        return { success: true, message: 'User created successfully' };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: 'Failed to create user' };
    }
}
