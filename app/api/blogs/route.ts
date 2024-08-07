import { connectToDB } from "@/utils/database";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
import { ErrorCodes } from "@/utils/constants";
import { PipelineStage } from "mongoose";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    const body = await request.json();
    const isMostPopularQuery = await request.nextUrl.searchParams.get("option");
    await connectToDB();
    const pageNo = Number(request.nextUrl.searchParams.get("pageno")) || 1;
    const referenceBlog: {
      title: string;
      description: string;
      genre: string;
    } = await body;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
    const skippingNumber = (pageNo - 1) * limit;
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
      {
        $lookup: {
          from: "users",
          localField: "userid",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          image: 1,
          date: 1,
          genre: 1,
          thumbs: 1,
          userid: { $arrayElemAt: ["$user", 0] },
        },
      },
      { $limit: 5 },
      { $skip: skippingNumber },
    ];
    const pipeline2: PipelineStage[] = [
      {
        $sort: {
          popularity: 1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userid",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          image: 1,
          date: 1,
          genre: 1,
          thumbs: {
            $cond: {
              if: { $isArray: "$thumbs" },
              then: { $size: "$thumbs" },
              else: "NA",
            },
          },
          userid: { $arrayElemAt: ["$user", 0] },
        },
      },
      {
        $skip: skippingNumber,
      },
      {
        $limit: 5,
      },
    ];
    const [blogs, noOfBlogs] = await Promise.all([
      isMostPopularQuery === "popular?" ||
      typeof referenceBlog.title === "undefined"
        ? Blog.aggregate(pipeline2)
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
    console.log(error);
    return new NextResponse(
      JSON.stringify({
        errorCode: ErrorCodes.NORMAL,
        errorMessage: error,
      }),
      {
        status: 500,
      }
    );
  }
};
export { POST };
