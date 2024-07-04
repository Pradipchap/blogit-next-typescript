import bcrypt from "bcrypt";
import UserCredentials from "@/models/userCredentials";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ErrorInterface } from "@/types/dataTypes";
import { ErrorCodes } from "@/utils/constants";
import sendError from "@/utils/sendError";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { email, password } = await req.json();
    const userDetail = await UserCredentials.findOne({ email }).populate(
      "user"
    );
    if (!userDetail) {
      return sendError(ErrorCodes.USER_NOT_FOUND, "sorry user not found", 401);
    }
    const userVerifiedDate = await userDetail.verifiedAt;
    if (!userVerifiedDate) {
      return sendError(
        ErrorCodes.EMAIL_NOT_VERIFIED,
        "sorry email not verified"
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userDetail.password
    );
    if (isPasswordCorrect) {
      const token = jwt.sign(
        { userID: userDetail.user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: 86400,
        }
      );
      return new NextResponse(
        JSON.stringify({
          accessToken: token,
          email: userDetail.user.email,
          username: userDetail.user.username,
          userID: userDetail.user._id,
          phone: userDetail.user.phone,
          image: userDetail.user.image,
          dateofbirth: userDetail.user.dateofbirth,
        }),
        {
          status: 200,
        }
      );
    } else {
      throw "password doesn't match";
    }
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
