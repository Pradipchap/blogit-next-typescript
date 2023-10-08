import { connectToDB } from "@/utils/database";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest, res: NextResponse) => {
  const searchString = await req.nextUrl.searchParams.get("searchString");
  try {
    await connectToDB();
    const pipeline = [
      {
        $search: {
          index: "blogSearch",
          text: {
            query: searchString,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ];
    const blogs = await Blog.aggregate(pipeline).limit(5);
    const noOfBlogs = 5;
    return new NextResponse(
      JSON.stringify({ blogs: blogs, noOfBlogs: noOfBlogs }),
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "server error" }));
  }
};
export { GET };
