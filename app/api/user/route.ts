import db from '@/services/neon/db';
import { userTables } from '@/drizzle/schemas/users';
import { eq } from "drizzle-orm";
import { NextResponse } from 'next/server';
import { User, userSchema } from '@/lib/validation';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  };

  const [currUser] = await db.select()
    .from(userTables)
    .where(eq(userTables.clerkId, userId));

  if (!currUser) {
    return NextResponse.json(null, { status: 200 }); // връщаме null ако няма
  }

  return NextResponse.json(currUser, { status: 200 });
};

export async function POST(request: Request) {
  const clerkUser = await currentUser();
  const { userId, name, role, organization } = await request.json();
  const newUserData: User = {
    clerkId: userId,
    name,
    email: clerkUser?.emailAddresses[0]?.emailAddress || "",
    role,
    organization
  };
  const parsed = userSchema.safeParse(newUserData);
  if (!parsed.success) {
    const errors = parsed.error.errors.map((err) => err.message);
    return NextResponse.json({ message: "Validation errors", errors }, { status: 400 });
  };

  const [newUser] = await db
    .insert(userTables)
    .values(newUserData)
    .returning();

  return new Response(JSON.stringify(newUser), { status: 201 });
}