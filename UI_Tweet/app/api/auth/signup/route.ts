import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password, provider, providerAccountId, image } = await request.json();

    if (!email || (!password && !provider)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    let hashedPassword: string | null = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Create a new user (Handles both Credential & OAuth users)
    const user = await prisma.user.create({
      data: {
        name: name ?? '', // Name is required for credentials but optional for OAuth
        email,
        password: hashedPassword, // Null for OAuth users
        provider: provider ?? 'credentials', // Defaults to 'credentials' if not provided
        providerAccountId: providerAccountId ?? null, // Stores OAuth user ID
        image: image ?? null, // Profile picture from OAuth
        type: 'free', // Default user type is "free"
      },
    });

    return NextResponse.json(
      { 
        id: user.id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        type: user.type
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Error creating user' },
      { status: 500 }
    );
  }
}
