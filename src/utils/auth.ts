import NextAuth, { Session, User } from "next-auth";
import authConfig from "./auth.config";
import { IInstructor, Instructor } from "@/models/instructorModel";
import { JWT } from "next-auth/jwt";

const fetchUser = async (email: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/user/find`,
      // "https://skillforge-two.vercel.app/api/user/find",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.log("Failed to fetch user: ", error);
    return null;
  }
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (token.email) {
        const user = await fetchUser(token.email);
        if (user) {
          token.id = user._id;
          token.name = user.name;
          token.email = user.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && token.email) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      // console.log(session);
      return session;
    },
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "google") {
        const { name, email, image } = user;
        const userSSO = await fetchUser(user.email);
        if (userSSO) {
          user.id = userSSO._id;
          user.name = userSSO.name;
          user.email = userSSO.email;
          return true;
        } else {
          const response = await fetch(
            // "http://localhost:3000/api/user/register",
            "https://skillforge-two.vercel.app/api/user/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                image,
              }),
            }
          );
          const data = await response.json();
          if (response.ok) {
            const userSSO = await fetchUser(user.email);
            if (userSSO) {
              user.id = userSSO._id;
              user.name = userSSO.name;
              user.email = userSSO.email;
              return true;
            }
          } else {
            console.log("Error registering new SSO user.");
            return "/?failed=1";
          }
        }
      }
      return true;
    },
  },

  session: { strategy: "jwt" },
  ...authConfig,
});
