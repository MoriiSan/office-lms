import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

interface Credentials {
  email: string;
  password: string;
}

async function studentLogin(credentials: Credentials): Promise<any | null> {
  try {
    const response = await fetch(
        "http://localhost:3000/api/user/find",
      // "https://skillforge-two.vercel.app/api/user/find",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email }),
      }
    );
    const user = await response.json();
    // console.log("User:", user);
    if (response.ok && user) {
      const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (isPasswordCorrect) {
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      }
    } else {
      console.log("Error auth login");
    }
  } catch (error) {
    console.log("Login failed: ", error);
    return null;
  }
}

export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return await studentLogin(credentials as Credentials);
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
} satisfies NextAuthConfig;
