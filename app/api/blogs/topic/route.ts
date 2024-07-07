import { connectToDB } from "@/utils/database";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
import { ErrorCodes } from "@/utils/constants";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    await connectToDB();
    const pageNo = Number(request.nextUrl.searchParams.get("pageno")) || 1;
    const topic = request.nextUrl.searchParams.get("topic")

    const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
    const skippingNumber = (pageNo - 1) * limit;
    const [blogs, noOfBlogs] = await Promise.all([
      Blog.find({ genre: topic })
        .populate("userid")
        .limit(5)
        .skip(skippingNumber),
      Blog.countDocuments({}),
    ]);
		console.log(blogs)
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
