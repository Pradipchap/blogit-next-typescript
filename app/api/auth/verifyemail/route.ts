import bcrypt from "bcrypt";
import UserCredentials from "@/models/userCredentials";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
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
      return new NextResponse(
        JSON.stringify({ errorMessage: "Wrong verification code" }),
        { status: 401 }
      );
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
      JSON.stringify({ errorMessage: "something wrong happened" }),
      { status: 401 }
    );
  }
};

export { POST };
