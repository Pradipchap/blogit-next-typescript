
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
const GET = async (request:NextRequest) => {
  try {
await connectToDB()

    // const requestPageNo = request.nextUrl.searchParams.get("page");
    // const pageNo = requestPageNo ? requestPageNo : 1;
    // const skippedNumber = (pageNo - 1) * 5;

    // const noOfBlogs = await Blog.count({});

    // const blogs = await Blog.find({})
      // .sort({ date: -1 })
      // .limit(5)
      // .skip(skippedNumber)
      // .populate("userid");

    return new NextResponse(JSON.stringify({ noOfBlogs: "noOfBlogs", blogs:'asd' }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
export { GET };
