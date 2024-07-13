"use server";

import getApiCookie from "@/custom_hooks/getApiCookie";
import Blog from "@/models/blogModel";
import { connectToDB } from "@/utils/database";

export async function handleThumbClick(blogId: string) {
  try {
    await connectToDB();
    await Blog.findByIdAndUpdate(blogId, { $inc: { thumbs: 1 } });
  } catch (error) {}
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
