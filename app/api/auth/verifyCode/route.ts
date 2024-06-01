import { ErrorCodes } from "@/utils/constants";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UserCredentials from "@/models/userCredentials";
import { ErrorInterface } from "@/types/dataTypes";
import sendError from "@/utils/sendError";

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
      return sendError(ErrorCodes.WRONG_CODE, "Wrong verification code");
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
    return new NextResponse(
      JSON.stringify({
        errorCode: ErrorCodes.NORMAL,
        errorMessage: "sorry,something wrong happened",
      }),
      {
        status: 500,
      }
    );
  }
};

export { POST };
