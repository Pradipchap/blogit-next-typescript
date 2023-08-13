import GoogleProvider from "next-auth/providers/google";
import User from "@/models/userModel";
import { connectToDB } from "@/utils/database";
import { NextAuthOptions, Session } from "next-auth";
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      session.user.id = "pcpgadn";
      return session;
    },
    
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
