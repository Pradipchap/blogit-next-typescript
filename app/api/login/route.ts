import bcrypt from "bcrypt";
import UserCredentials from "@/models/userCredentials";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import { ErrorCodes } from "@/utils/constants";
import jwt from "jsonwebtoken";

const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { email, password } = await req.json();
    const userDetail = await UserCredentials.findOne({ email }).populate(
      "user"
    );
    console.log(userDetail);
    if (!userDetail) {
      throw new Error("User doesn't exists");
    }
    const userVerifiedDate = await userDetail.verifiedAt;
    console.log(userVerifiedDate);
    if (!userVerifiedDate) {
      return new NextResponse(
        JSON.stringify({
          errorMessage: "User not verified",
          errorCode: ErrorCodes.EMAIL_NOT_VERIFIED,
        }),
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userDetail.password
    );
    console.log(isPasswordCorrect);
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
        }),
        {
          status: 200,
          headers: {
            "Set-Cookie": `blogit=${JSON.stringify({
              accessToken: token,
              email: userDetail.user.email,
              username: userDetail.user.username,
              userID: userDetail.user._id,
            })}`,
          },
        }
      );
    } else {
      throw new Error("password doesn't match");
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ errorMessage: "something wrong happened" }),
      { status: 401 }
    );
  }
};

export { POST };
