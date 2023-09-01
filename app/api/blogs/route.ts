import { connectToDB } from "@/utils/database";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
const GET = async (request: NextRequest) => {
  try {
    await connectToDB();

    const blogs = await Blog.find({}).populate("userid");
    const noOfBlogs = await blogs.length;

    return new NextResponse(
      JSON.stringify({ noOfBlogs: noOfBlogs, blogs: blogs }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
export { GET };
