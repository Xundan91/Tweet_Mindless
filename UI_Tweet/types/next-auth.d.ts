import "next-auth";

// Extend the built-in session and user types
declare module "next-auth" {
  interface Session {
    user: {
      oauth_token_secret: {};
      oauth_token: {};
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      userType?: string;
      provider?: string; // New field for OAuth users (e.g., "google", "github", "twitter")
      providerAccountId?: string | null; // Unique ID for OAuth users
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    userType?: string;
    provider?: string; // New field for OAuth users
    providerAccountId?: string | null; // Unique ID for OAuth users
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    userType?: string;
    provider?: string; // Stores provider info in JWT
    providerAccountId?: string | null; // Stores OAuth user ID in JWT
  }
}