import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "../../../../../models/userModel";
import { connectDB } from "../../../../../utils/connect";
import GithubProvider from "next-auth/providers/github";

async function login(credentials: any) {
  try {
    connectDB();
    const user = await User.findOne({ email: credentials.email });
    if (!user) throw new Error("Email does not exist.");
    const isCorrect = await bcrypt.compare(credentials.password, user.password);
    if (!isCorrect) throw new Error("Wrong Password.");
    return user;
  } catch (error) {
    console.log("Error while logging in.");
    throw new Error("Something went wrong.");
  }
}

export const authOptions: any = {
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          const user = login(credentials);
          return user;
        } catch (error) {
          console.log("Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.fullName = user.fullName;
        token.email = user.email;
        token.id = user.id;
      }
      console.log("Token:", token);
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.fullName = token.fullName;
        session.user.email = token.email;
        session.token.id = token.id;
      }
      console.log("Session:", session);
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// export default NextAuth(authOptions)
