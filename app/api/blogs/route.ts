import { connectToDB } from "@/utils/database";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";

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
    return new NextResponse(JSON.stringify({ error: error }), { status: 500 });
  }
};
export { GET };
