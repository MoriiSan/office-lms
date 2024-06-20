import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Student } from "@/models/studentModel";
import { connectDB } from "@/utils/connect";
import { Session, User } from "next-auth";

interface Credentials {
  email: string;
  password: string;
}

async function studentLogin(credentials: Credentials): Promise<any | null> {
  try {
    await connectDB("skillforgeDB");
    const user = await Student.findOne({ email: credentials.email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (isPasswordCorrect) {
        return { id: user._id.toString(), name: user.name, email: user.email };
      }
    }
    return null;
  } catch (error) {
    console.log("Login failed: ", error);
    return null;
  }
}

async function SSOlogin(email: string): Promise<any | null> {
  try {
    const user = await Student.findOne({ email: email });
    if (!user) {
      return null;
    }
    return { id: user._id.toString(), name: user.name, email: user.email };
  } catch (error) {
    console.log("SSO Login failed: ", error);
    return null;
  }
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
      async authorize(credentials) {
        const user = await studentLogin(credentials as Credentials);
        return user;
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
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      // console.log(session)
      return session;
    },
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "google") {
        const { name, email, image } = user;

        try {
          await connectDB("skillforgeDB");

          const existingUser = await SSOlogin(email);
          if (existingUser) {
            user.id = existingUser.id;
            user.name = existingUser.name;
            user.email = existingUser.email;
            return user;
          } else {
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
              return user;
            } else {
              console.log("Error registering new SSO user.");
              return "/?failed=1";
            }
          }
        } catch (error) {
          console.log("Error SSO Log-In.", error);
        }
      }
      return user;
    },
  },
  // cookies: {
  //   sessionToken: {
  //     name: `student-next-auth.session-token`,
  //     options: {
  //       path: "/",
  //       httpOnly: true,
  //       sameSite: "lax" as const,
  //       secure: process.env.NODE_ENV === "production",
  //     },
  //   },
  // },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
