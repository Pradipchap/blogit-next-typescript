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
    const skip = 0; // Set the skip value for pagination
    const limit = 10; // Set the limit value for pagination

    const pipeline = [
      { $match: { _id: new mongoose.Types.ObjectId(id || "") } },
      { $project: { comments: 1 } },
      { $unwind: "$comments" },
      {
        $lookup: {
          from: "users", // Make sure the collection name is correct
          localField: "comments.userid",
          foreignField: "_id",
          as: "comments.userid",
        },
      },
      { $unwind: "$comments.userid" },
      {
        $project: {
          "comments.comment": 1,
          "comments._id": 1,
          "comments.datetime": 1,
          "comments.userid": {
            _id: 1,
            email: 1,
            username: 1,
            __v: 1,
            dateofbirth: 1,
            image: 1,
            phone: 1,
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          comments: { $push: "$comments" },
        },
      },
      { $skip: skip },
      { $limit: limit },
    ];
    const comments = await Blog.aggregate(pipeline);
    return new NextResponse(
      JSON.stringify({
        comments: comments[0].comments,
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
