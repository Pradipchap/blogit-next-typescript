import UserCredentials from "@/models/userCredentials";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { ErrorCodes } from "@/utils/constants";

const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const changePasswordCode = await req.cookies.get("changePasswordCode");
    console.log(changePasswordCode)
    const { email, password } = await req.json();
    await connectToDB();
    const credentials = await UserCredentials.findOne({ email });
    const isCorrectCode = await bcrypt.compare(
      changePasswordCode?.value?.toString(),
      credentials.code
    );
    if (!isCorrectCode) {
      throw {
        errorMessage: "sorry authentication failed",
        errorCode: ErrorCodes.WRONG_CODE,
      };
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
    return new NextResponse(JSON.stringify({ message: "something wrong" }), {
      status: 500,
    });
  }
};

export { POST };
