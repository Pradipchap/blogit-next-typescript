import Blog from "@/models/blogModel";
import { ErrorCodes } from "@/utils/constants";
import mongoose, { PipelineStage } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const GET = async (request: NextRequest, response: NextResponse) => {
  const id = await request.nextUrl.searchParams.get("blogid");
  try {
    const pipeline = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id || ""),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userid",
          foreignField: "_id",
          as: "userid",
        },
      },
      {
        $project: {
          comments: {
            $cond: {
              if: { $isArray: "$comments" },
              then: { $size: "$comments" },
              else: "NA",
            },
          },
          userid: { $arrayElemAt: ["$userid", 0] },
          title: 1,
          description: 1,
          genre: 1,
          image: 1,
          content: 1,
          _id: 1,
          thumbs: {
            $cond: {
              if: { $isArray: "$thumbs" },
              then: { $size: "$thumbs" },
              else: "NA",
            },
          },
          date: 1,
        },
      },
    ];
    const blog = await Blog.aggregate(pipeline);
    console.log(await blog[0]);
    return new NextResponse(
      JSON.stringify({
        blog: blog[0],
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
