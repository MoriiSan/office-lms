import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import authConfig from "./auth.config";
import { connectDB } from "@/utils/connect";

export const {
    handlers: { GET, POST   },
    auth,
} = NextAuth({
    
    ...authConfig
});