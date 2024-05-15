import GoogleProvider from "next-auth/providers/google";
import User from "@/models/userModel";
import { connectToDB } from "@/utils/database";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
			await connectToDB()
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      const phone = user.phone.toString();
      const dateofbirth = user.dateofbirth.toString();
      return {
        user: {
          name: session.user.name,
          email: session.user.email,
          id: session.user.id,
          image: session.user.image,
          dateofbirth,
          phone,
        },
        expires: session.expires,
      };
    },
    async signIn({ profile }) {
      try {
        if (typeof profile?.email === "undefined") {
          throw new Error();
        }
        await connectToDB();
        const userExists = await User.findOne({ email: profile?.email });
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name,
            image: profile?.image,
            dateofbirth: new Date(),
            phone: "",
          });
        }
        return true;
      } catch (error) {
        console.log("error while signing in", error);
        return false;
      }
    },
  },
};

export default authOptions;
