import { connectToDB } from "@/utils/database";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
import { ErrorCodes } from "@/utils/constants";
import getApiCookie from "@/custom_hooks/getApiCookie";
import sendError from "@/utils/sendError";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    const session = getApiCookie(request);
    if (!session) {
      return sendError(
        ErrorCodes.USER_NOT_AUTHENTICATED,
        "sorry you are not authenticated"
      );
    }
    const { blogId } = await request.json();
    await connectToDB();
    const response = await Blog.findByIdAndDelete(blogId);

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
