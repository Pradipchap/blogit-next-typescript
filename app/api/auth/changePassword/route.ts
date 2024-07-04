import UserCredentials from "@/models/userCredentials";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { ErrorCodes } from "@/utils/constants";
import sendError from "@/utils/sendError";

const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const changePasswordCode = await req.cookies.get("changePasswordCode");
    const { email, password } = await req.json();
    await connectToDB();
    const credentials = await UserCredentials.findOne({ email });
    const isCorrectCode = await bcrypt.compare(
      changePasswordCode?.value?.toString(),
      credentials.code
    );
    if (!isCorrectCode) {
      return sendError(ErrorCodes.WRONG_CODE, "wrong verification code");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const updatedUserCredentials = await UserCredentials.findOneAndUpdate(
      { email },
      { password: encryptedPassword }
    );
    return new NextResponse(
      JSON.stringify({ message: "password changed successfully" }),
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
