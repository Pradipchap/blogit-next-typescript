import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const GET = async (request: NextRequest, response: NextResponse) => {
  const id = await request.nextUrl.searchParams.get("blogid");
  try {
    const blog = await Blog.findById(id).populate("userid");
    return new NextResponse(
      JSON.stringify({
        blog,
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
