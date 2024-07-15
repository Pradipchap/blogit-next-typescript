"use server";

import Blog from "@/models/blogModel";
import { connectToDB } from "@/utils/database";
import mongoose from "mongoose";

export async function handleThumbClick(blogId: string, userId: string) {
  try {
    await connectToDB();
    await Blog.findByIdAndUpdate(blogId, { $addToSet: { thumbs: userId } });
  } catch (error) {}
}
export async function handleIsBlogThumbed(blogId: string, userId: string) {
  try {
    await connectToDB();
    const pipeline = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(blogId),
        },
      },
      {
        $project: {
          isLiked: { $in: [new mongoose.Types.ObjectId(userId), "$thumbs"] },
        },
      },
    ];
    const x = await Blog.aggregate(pipeline);
    return x[0].isLiked;
  } catch (error) {
    return true;
  }
}

export async function handleCommentPost(
  blogId: string,
  comment: string,
  userId: string
) {
  try {
    await connectToDB();
    await Blog.findByIdAndUpdate(blogId, {
      $push: { comments: { comment, userid: userId } },
    });
    return true;
  } catch (error) {
    return false;
  }
}
