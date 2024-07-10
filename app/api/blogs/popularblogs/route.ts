import { connectToDB } from "@/utils/database";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
import { ErrorCodes } from "@/utils/constants";
import { PipelineStage } from "mongoose";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    await connectToDB();
    const pipeline: PipelineStage[] = [
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
          userid: { $arrayElemAt: ["$user", 0] },
        },
      },
      {
        $limit: 3,
      },
    ];
    const blogs = await Blog.aggregate(pipeline);
    return new NextResponse(
      JSON.stringify({
        blogs: blogs,
        noOfBlogs: 3,
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
export { GET };
