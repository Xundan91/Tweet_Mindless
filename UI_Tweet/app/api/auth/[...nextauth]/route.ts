import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) return null;

          return {
            id: String(user.id),
            name: user.name ?? undefined,
            email: user.email ?? undefined,
            userType: user.type,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "1.0A",
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) return false;

      let email = user.email ?? "";

      // ✅ Fix: Use Type Assertions for Profile Properties
      if (account.provider === "twitter" && profile) {
        const twitterProfile = profile as { id_str?: string };
        email = `twitter-${twitterProfile.id_str ?? "unknown"}@twitter.com`;
      } else if (account.provider === "github" && profile) {
        const githubProfile = profile as { id?: string };
        email = `github-${githubProfile.id ?? "unknown"}@github.com`;
      }

      let existingUser = await prisma.user.findUnique({
        where: { email },
      });

      // ✅ Store Twitter OAuth tokens safely
      const twitterOauthToken =
        account.provider === "twitter" && "oauth_token" in account
          ? (account.oauth_token as string | null)
          : null;

      const twitterOauthSecret =
        account.provider === "twitter" && "oauth_token_secret" in account
          ? (account.oauth_token_secret as string | null)
          : null;

      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            email,
            name: user.name ?? "Unknown User",
            image: user.image ?? undefined,
            provider: account.provider,
            type: "free",
            twitterOauthToken,
            twitterOauthSecret,
          },
        });
      } else if (account.provider === "twitter") {
        await prisma.user.update({
          where: { email },
          data: { twitterOauthToken, twitterOauthSecret },
        });
      }

      user.id = String(existingUser.id);
      user.userType = existingUser.type;
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = String(user.id);
        token.userType = user.userType;

        if (account?.provider === "twitter") {
          token.oauth_token =
            typeof account.oauth_token === "string" ? account.oauth_token : null;
          token.oauth_token_secret =
            typeof account.oauth_token_secret === "string" ? account.oauth_token_secret : null;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.userType = token.userType as string;

        if (token.oauth_token && token.oauth_token_secret) {
          session.user.oauth_token = token.oauth_token;
          session.user.oauth_token_secret = token.oauth_token_secret;
        }
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
