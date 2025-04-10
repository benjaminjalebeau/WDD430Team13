import { NextResponse } from 'next/server';
import postgres from 'postgres';

// Initialize PostgreSQL connection /
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// GET: Fetch all users or a specific user by ID
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    try {
        if (userId) {
            // Fetch a specific user by ID
            const user = await sql`
                SELECT id, name, email, bio, photo_url AS "photoURL", user_type AS "userType"
                FROM users
                WHERE id = ${userId}
            `;
            if (user.length === 0) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }
            return NextResponse.json(user[0]);
        } else {
            // Fetch all users
            const users = await sql`
                SELECT id, name, email, bio, photo_url AS "photoURL", user_type AS "userType"
                FROM users
            `;
            return NextResponse.json(users);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

// POST: Create a new user
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, userType, bio, photoURL } = body;

        // Insert the new user into the database
        await sql`
            INSERT INTO users (name, email, password, user_type, bio, photo_url)
            VALUES (${name}, ${email}, ${password}, ${userType}, ${bio || null}, ${photoURL || null})
        `;

        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}

// PUT: Update an existing user
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, name, email, bio, photoURL } = body;

        // Update the user in the database
        await sql`
            UPDATE users
            SET
                name = ${name || null},
                email = ${email || null},
                bio = ${bio || null},
                photo_url = ${photoURL || null}
            WHERE id = ${id}
        `;

        return NextResponse.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

// DELETE: Delete a user by ID
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    try {
        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // Delete the user from the database
        await sql`
            DELETE FROM users
            WHERE id = ${userId}
        `;

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}