import bcrypt from "bcrypt";
import { connectToDB } from "@/utils/database";
import User from "@/models/userModel";
import UserCredentials from "@/models/userCredentials";
import { NextRequest, NextResponse } from "next/server";
import { ErrorCodes } from "@/utils/constants";
import getVerificationCode from "@/utils/getVerificationCode";
import sendMail from "@/utils/sendMail";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const POST = async (request: NextRequest) => {
  console.log("first");
  try {
    const data = await request.json();
    console.log(data);
    const { email, username, password } = data;
    console.log(email);

    await connectToDB();
    console.log("first");
    const doesUserExists = await User.exists({ email });
    if (doesUserExists) {
      return new NextResponse(
        JSON.stringify({
          errorCode: ErrorCodes.USER_EXISTS,
          errorMessage: "User already exists!",
        }),
        {
          status: 500,
        }
      );
    }
    console.log("first");
    const user = await User.create({ email, username });
 
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const { verificationCode, hashedCode } = await getVerificationCode();
    const userCredential = await UserCredentials.create({
      email,
      password: hashedPassword,
      user: user._id,
      code: hashedCode,
    });
    await sendMail({
      to: email.toString(),
      text: verificationCode.toString(),
      subject: "Verify Email",
      html: "",
    });
    console.log("success");
    return new NextResponse(
      JSON.stringify({ doesUserExists, userCredential }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: error }), { status: 500 });
  }
};
export { POST };
