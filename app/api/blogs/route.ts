import { connectToDB } from "@/utils/database";
import { useSearchParams } from "next/navigation";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    await connectToDB();

    const blogs = await Blog.find({}).populate("userid");
    const noOfBlogs = await blogs.length;

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
    return new Response(JSON.stringify({ error: error, status: 500 }));
  }
};
export { GET };
