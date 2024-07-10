import User from "@/models/userModel";
import { ErrorCodes } from "@/utils/constants";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sendMail from "@/utils/sendMail";
import UserCredentials from "@/models/userCredentials";
import sendError from "@/utils/sendError";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const POST = async (req: NextRequest, res: NextResponse) => {
  const client = await connectToDB();
  if (!client) {
    return sendError(ErrorCodes.NORMAL, "Failed to connect to the database");
  }
  const session = await client.startSession();
  await session.startTransaction();
  try {
    const { email } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return sendError(ErrorCodes.USER_NOT_FOUND, "User not found");
    }
    const code = Math.ceil(Math.random() * 1000000);
    const encryptedCode = await bcrypt.hash(code.toString(), 10);
    await sendMail({
      to: email,
      text: code.toString(),
      subject: "verification code",
      html: "",
    });
    await UserCredentials.findOneAndUpdate(
      { email },
      { code: encryptedCode },
      { session }
    );
    await session.commitTransaction();
    return new NextResponse(
      JSON.stringify({
        message: "verification code sent successfully",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    await session.abortTransaction();
    return new NextResponse(
      JSON.stringify({
        errorCode: ErrorCodes.NORMAL,
        errorMessage: "sorry,something wrong happened",
      }),
      {
        status: 500,
      }
    );
  } finally {
    await session.endSession();
    await client.disconnect();
  }
};

export { POST };
