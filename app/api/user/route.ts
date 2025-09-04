import db from '@/services/neon/db';
import { userTables } from '@/drizzle/schemas/users';
import { eq } from "drizzle-orm";
import { NextResponse } from 'next/server';
import { User, userSchema } from '@/lib/validation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return new Response("User ID is required", { status: 400 });
  };

  const [currUser] = await db.select()
    .from(userTables)
    .where(eq(userTables.clerkId, userId));

  if (!currUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  };

  return NextResponse.json(currUser, { status: 200 });
};

export async function POST(request: Request) {
  const { userId, name, email, role } = await request.json();
  const newUserData: User = {
    clerkId: userId,
    name,
    email,
    role
  };
  const parsed = userSchema.safeParse(newUserData);
  if (!parsed.success) {
    const errors = parsed.error.errors.map((err) => err.message);
    return NextResponse.json({ message: "Validation errors", errors }, { status: 400 });
  };
  if (!userId || !email) {
    return NextResponse.json({ message: "User ID and email are required" }, { status: 400 });
  };

  const [newUser] = await db
    .insert(userTables)
    .values(newUserData)
    .returning();

  return new Response(JSON.stringify(newUser), { status: 201 });
}