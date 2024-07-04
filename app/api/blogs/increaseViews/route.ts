import { connectToDB } from "@/utils/database";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
import { ErrorCodes } from "@/utils/constants";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    const { blogid } = await request.json();
    await connectToDB();
    const response = await Blog.findByIdAndUpdate(blogid, {
      $inc: { popularity: 1 },
    });

    return new NextResponse(JSON.stringify({}), {
      status: 200,
    });
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
