import bcrypt from "bcrypt";
import { connectToDB } from "@/utils/database";
import User from "@/models/userModel";
import UserCredentials from "@/models/userCredentials";
import { NextRequest, NextResponse } from "next/server";
import { ErrorCodes } from "@/utils/constants";
import getVerificationCode from "@/utils/getVerificationCode";
import sendMail from "@/utils/sendMail";
import sendError from "@/utils/sendError";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const POST = async (request: NextRequest) => {
  const client = await connectToDB();

  if (!client) {
    return sendError(ErrorCodes.NORMAL, "Failed to connect to the database");
  }
  const session = await client.startSession();
  await session.startTransaction();
  try {
    const data = await request.json();
    const { email, username, password } = data;

    const doesUserExists = await User.exists({ email });
    if (doesUserExists) {
      return sendError(ErrorCodes.USER_EXISTS, "User already exists!");
    }

    const user = await User.create([{ email, username }], { session });
    console.log("returned user", user);
    const hashedPassword = await bcrypt.hash(password, 10);
    const { verificationCode, hashedCode } = await getVerificationCode();

    const userCredential = await UserCredentials.create(
      [
        {
          email,
          password: hashedPassword,
          user: user[0]._id,
          code: hashedCode,
        },
      ],
      { session }
    );

    await sendMail({
      to: email.toString(),
      text: verificationCode.toString(),
      subject: "Verify Email",
      html: "",
    });

    await session.commitTransaction();

    return new NextResponse(
      JSON.stringify({ doesUserExists, userCredential }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error is", error);
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
  }
};
export { POST };
