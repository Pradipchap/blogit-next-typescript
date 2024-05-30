import { connectToDB } from "@/utils/database";
import Blog from "@/models/blogModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import getApiCookie from "@/custom_hooks/getApiCookie";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    await connectToDB();
    const pageNo = Number(request.nextUrl.searchParams.get("pageno")) || 1;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
    const skippingNumber = (pageNo - 1) * limit;

    const [blogs, noOfBlogs] = await Promise.all([
      Blog.find({})
        .populate("userid")
        .sort({ date: -1 })
        .limit(limit)
        .skip(skippingNumber),
      Blog.countDocuments({}),
    ]);

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
    console.log(error)
    return new NextResponse(JSON.stringify({ error: JSON.stringify(error) }), { status: 500 });
  }
};
export { GET };
