import User from "@/models/userModel";
import { ErrorCodes } from "@/utils/constants";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sendMail from "@/utils/sendMail";
import UserCredentials from "@/models/userCredentials";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDB();
    const { email } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      throw {
        errorMessage: "User not found",
        errorCode: ErrorCodes.USER_NOT_FOUND,
      };
    }
    const code = Math.ceil(Math.random() * 1000000);
    const encryptedCode = await bcrypt.hash(code.toString(), 10);
    await sendMail({
      to: email,
      text: code.toString(),
      subject: "verification code",
      html: "",
    });
    await UserCredentials.findOneAndUpdate({ email }, { code: encryptedCode });
    return new NextResponse(
      JSON.stringify({
        message: "verification code sent successfully",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ errorMessage: error }), {
      status: 401,
    });
  }
};

export { POST };
