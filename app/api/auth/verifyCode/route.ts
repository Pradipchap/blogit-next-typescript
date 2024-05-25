import { ErrorCodes } from "@/utils/constants";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UserCredentials from "@/models/userCredentials";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { email, code } = await req.json();
    await connectToDB();
    const userCredentials = await UserCredentials.findOne({ email });
    const isCodeCorrect = await bcrypt.compare(
      code.toString(),
      userCredentials.code
    );
    console.log(isCodeCorrect);
    if (!isCodeCorrect) {
      throw {
        errorMessage: "Wrong verification code",
        errorCode: ErrorCodes.WRONG_CODE,
      };
    }
    const newVerificationCodeForChangingPassword = Math.ceil(
      Math.random() * 1000000
    );
    const encryptedCode = await bcrypt.hash(
      newVerificationCodeForChangingPassword.toString(),
      10
    );
    await UserCredentials.findByIdAndUpdate(userCredentials._id, {
      code: encryptedCode,
    });
    return new NextResponse(
      JSON.stringify({
        changePasswordCode: newVerificationCodeForChangingPassword.toString(),
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ errorMessage: error }), {
      status: 401,
    });
  }
};

export { POST };
