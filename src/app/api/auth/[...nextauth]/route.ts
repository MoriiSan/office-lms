import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import SSO_User from "@/models/SSOModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";

interface SSO_User {
  name: string;
  email: string;
}

async function login(credentials: { email: string; password: string }) {
  try {
    const user = await User.findOne({ email: credentials.email });
    // console.log("credentials:", credentials);
    // console.log("user:", user);
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

// async function SSOlogin(email: SSO_User) {
//   try {
//     const user = await SSO_User.findOne({ email: email });
//     if (!user) {
//       console.log("SSO Log-In: User does not exist.");
//       return null;
//     }
//     return user;
//   } catch (error) {
//     console.log("SSO Login failed: ", error);
//   }
// }

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
        await connectDB("skillforgeDB");
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
        token.name = user.name;
        token.email = user.email;
        token.id = user.id;
      }
      // console.log("Token: ", token);
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.id = token.sub;
      }
      // console.log("Session: ", session);
      return session;
    },
    async signIn({ user, account }: { user: any; account: any }) {
      // console.log("User: ", user);
      // console.log("Account: ", account);

      // if (account.provider === "google") {
      //   await connectDB();
      //   const userSSO = await SSOlogin(user.email);
      //   if (!userSSO) {
      //     return "/";
      //   }
      // }

      if (account.provider === "google") {
        const { name, email, image } = user;
        try {
          const res = await fetch("http://localhost:3000/api/user/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              image,
            }),
          });
          if (res.ok) {
            // console.log("New SSO login saved.");
            return user;
          }
        } catch (error) {
          console.log("Error SSO Log-In.", error);
        }
      }

      return user;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
