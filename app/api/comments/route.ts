import Blog from "@/models/blogModel";
import { ErrorCodes } from "@/utils/constants";
import { connectToDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import mongoose, { connect, PipelineStage } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const GET = async (request: NextRequest, response: NextResponse) => {
  const id = await request.nextUrl.searchParams.get("blogId");
  console.log(id);
  const pageNo = Number(
    (await request.nextUrl.searchParams.get("blogId")) || "1"
  );
  console.log("first");
  try {
    await connectToDB();

    const pipeline = [
      { $match: { _id: new mongoose.Types.ObjectId(id || "") } },
      { $project: { comments: 1 } },
      { $unwind: "$comments" },
      {
        $lookup: {
          from: "users",
          localField: "comments.userid",
          foreignField: "_id",
          as: "comments.userid",
        },
      },
      {
        $project: {
          "comments.userid": { $arrayElemAt: ["$comments.userid", 0] },
          "comments.comment": 1,
          "comments.datetime": 1,
          "comments._id": 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          comments: { $push: "$comments" },
        },
      },
    ];
    const comments = await Blog.aggregate(pipeline);
    return new NextResponse(
      JSON.stringify({
        comments: comments[0]?.comments || [],
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
        errorMessage: "sorry,something wrong happened",
      }),
      {
        status: 500,
      }
    );
  }
};

export { GET };
