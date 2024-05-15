import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";

async function login(credentials: {email: string, password: string}) {
  try {
    const user = await User.findOne({ email: credentials.email });
    console.log("credentials:", credentials);
    console.log("user:", user);
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (isPasswordCorrect) {
        return user;
      }
    }
  } catch (error) {}
}

export const authOptions = {
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      // id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connectDB();
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          console.log("Failed to login:", error);
          return NextResponse.json(error, { status: 500 });
        }
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.name = user.fullName;
        token.email = user.email;
        token.id = user.id;
      }
      console.log("Token: ", token);
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.name = token.fullName;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      console.log("Session: ", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
