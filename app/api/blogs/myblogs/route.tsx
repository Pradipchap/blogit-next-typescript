import { connectToDB } from "@/utils/database";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
import getApiCookie from "@/custom_hooks/getApiCookie";
import { ErrorCodes } from "@/utils/constants";
import sendError from "@/utils/sendError";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const GET = async (request: NextRequest, response: NextResponse) => {
  const pageNo = await Number(request.nextUrl.searchParams.get("pageno"));

  try {
    const session = await getApiCookie(request);
    if (!session) {
      return sendError(ErrorCodes.USER_NOT_AUTHENTICATED, "Not Authenticated");
    }
    await connectToDB();
    const noOfBlogs = await Blog.countDocuments({});
    const skippingNumber =
      pageNo === 0 ? 0 : pageNo === 1 ? 0 : (pageNo - 1) * 5;
    const blogs = await Blog.find({ userid: session.userID })
      .populate("userid")
      .sort({ date: -1 })
      .limit(5)
      .skip(skippingNumber);

    return new NextResponse(
      JSON.stringify({
        blogs: blogs,
        noOfBlogs: noOfBlogs,
      }),
      {
        status: 200,
      }
    );
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
export { GET };
