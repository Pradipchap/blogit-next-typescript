import bcrypt from "bcrypt";
import UserCredentials from "@/models/userCredentials";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import { ErrorCodes } from "@/utils/constants";
import sendError from "@/utils/sendError";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const POST = async (req: NextRequest) => {
  const { code, email } = await req.json();

  try {
    await connectToDB();
    const credentials = await UserCredentials.findOne({ email });
    const isCorrectCode = await bcrypt.compare(
      code.toString(),
      credentials.code
    );
    console.log();
    if (!isCorrectCode) {
      return sendError(ErrorCodes.WRONG_CODE, "wrong verification code");
    } else {
      await UserCredentials.findByIdAndUpdate(credentials._id, {
        verifiedAt: new Date(),
      });
      return new NextResponse(
        JSON.stringify({ successMessage: "Email successfully verified" }),
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        errorCode: ErrorCodes.NORMAL,
        errorMessage: "something wrong happened",
      }),
      { status: 401 }
    );
  }
};

export { POST };
