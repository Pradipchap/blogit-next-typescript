import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import optimizeImage from "@/custom_hooks/optimizeImage";
import Blog from "@/models/blogModel";
import { ErrorCodes } from "@/utils/constants";
import getApiCookie from "@/custom_hooks/getApiCookie";
import sendError from "@/utils/sendError";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const POST = async (request: NextRequest) => {
  try {
    const session = getApiCookie(request);
    if (!session) {
      return sendError(
        ErrorCodes.USER_NOT_AUTHENTICATED,
        "sorry you are not authenticated"
      );
    }
    const data = await request.formData();
    await connectToDB();
    const { title, genre, description, userid, content, image, blogId } =
      Object.fromEntries(data.entries());
    const imageFile = image as File;
    if (!title || !genre || !description || !userid || !content) {
      throw "Missing required fields.";
    }
    let buffer = "";
    if (imageFile.size > 0) {
      buffer = await optimizeImage(image as File);
    }
    const parsedContent = await JSON.parse(content as string);
    if (blogId) {
      await Blog.findByIdAndUpdate(blogId, {
        userid,
        title,
        genre,
        description,
        ...(buffer !== "" ? { image: buffer } : {}),
        content: parsedContent,
      });
    } else {
      await Blog.create({
        userid,
        title,
        genre,
        date: Date.now(),
        description,
        image: buffer,
        content: parsedContent,
        popularity: 2,
      });
    }
    return new NextResponse("", { status: 200 });
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
