import bcrypt from "bcrypt";
import UserCredentials from "@/models/userCredentials";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { email, password } = await req.json();
    const userDetail = await UserCredentials.findOne({ email }).populate(
      "user"
    );
    console.log(await userDetail);
    if (!userDetail) {
      throw "User doesn't exists";
    }
    const userVerifiedDate = await userDetail.verifiedAt;
    if (!userVerifiedDate) {
      throw "User not verified";
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
      console.log(userDetail.user._id.toString());
      return new NextResponse(
        JSON.stringify({
          accessToken: token,
          email: userDetail.user.email,
          username: userDetail.user.username,
          userID: userDetail.user._id,
          phone: userDetail.user.phone,
          image:userDetail.user.image,
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
    console.log(error);
    return new NextResponse(JSON.stringify({ errorMessage: error }), {
      status: 401,
    });
  }
};

export { POST };
