import { connectToDB } from "@/utils/database";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
import { ErrorCodes } from "@/utils/constants";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    const body = await request.json();
    //console.log("request boyd", await body);
    const isMostPopularQuery = await request.nextUrl.searchParams.get("option");
    console.log(isMostPopularQuery);
    await connectToDB();
    const pageNo = Number(request.nextUrl.searchParams.get("pageno")) || 1;
    const referenceBlog: {
      title: string;
      description: string;
      genre: string;
    } = await body;
    if (typeof referenceBlog.title) {
    }
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
    const skippingNumber = (pageNo - 1) * limit;
    console.log(referenceBlog);
    const pipeline = [
      {
        $search: {
          moreLikeThis: {
            like: {
              ...referenceBlog,
            },
          },
        },
      },
      { $limit: 5 },
      { $skip: skippingNumber },
    ];
    const [blogs, noOfBlogs] = await Promise.all([
      isMostPopularQuery === "popular?" ||
      typeof referenceBlog.title === "undefined"
        ? Blog.find({}).sort({ popularity: -1 }).limit(5).skip(skippingNumber)
        : Blog.aggregate(pipeline),
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
    //console.log(error);
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
