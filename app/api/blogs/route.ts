import { connectToDB } from "@/utils/database";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
import { ErrorCodes } from "@/utils/constants";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    await connectToDB();
    const pageNo = Number(request.nextUrl.searchParams.get("pageno")) || 1;
    const referenceBlog: {
      title: string;
      description: string;
      genre: string;
    } = await request.json();
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
    const skippingNumber = (pageNo - 1) * limit;
    const pipeline = [
      {
        $search: {
          index: "blogSearch",
          morelikethis: {
            like: [
              {
                title: referenceBlog.title,
                description: referenceBlog.description,
                genre: referenceBlog.genre,
              },
            ],
          },
        },
      },
    ];
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
