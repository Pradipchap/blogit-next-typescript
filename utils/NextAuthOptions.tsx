import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import User from "@/models/userModel";
import { connectToDB } from "@/utils/database";
import { NextAuthOptions, RequestInternal } from "next-auth";
import UserCredentials from "@/models/userCredentials";
import getVerificationCode from "./getVerificationCode";
import sendMail from "./sendMail";
import bcrypt from "bcrypt";

type User = {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
};
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email Address", type: "email" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          //console.log("first");
          //console.log(credentials?.email);
          const userCredential = await UserCredentials.findOne({
            email: credentials?.email,
          }).populate("user");
          //console.log(userCredential);
          if (userCredential.verifiedAt) {
            // return userCredentials.user
            //console.log(userCredential.verifiedAt);
            const isCorrectPassword = await bcrypt.compare(
              credentials?.password,
              userCredential.password
            );
            //console.log(isCorrectPassword)
            if (!isCorrectPassword) {
              throw new Error("Wrong Password");
            } else {
              const user = await userCredential.user;
              const profile = {
                id: user._id.toString(),
                email: user.email,
                name: user.username,
              };
              //console.log(profile)
              return profile;
            }
          } else {
            const {
              verificationCode,
              hashedCode,
            } = await getVerificationCode();
            await sendMail({
              to: credentials?.email || "",
              text: verificationCode.toString(),
              html: "",
              subject: "verification code",
            });
            await UserCredentials.findByIdAndUpdate(userCredential._id, {
              code: hashedCode,
            });
            throw new Error(`/verifyemail?email=${credentials?.email}`);
          }
        } catch (error) {
          //console.log(error);
          throw new Error("hi");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      await connectToDB();
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
        //console.log("error while signing in", error);
        return false;
      }
    },
  },
};

export default authOptions;
