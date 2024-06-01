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
    const { title, genre, description, userid, content, image } =
      Object.fromEntries(data.entries());
    if (!title || !genre || !description || !userid || !content || !image) {
      throw "Missing required fields.";
    }
    const buffer = await optimizeImage(image as File);
    await console.log(await buffer);
    const parsedContent = await JSON.parse(content as string);
    await console.log(parsedContent);

    const newBlog = await new Blog({
      userid,
      title,
      genre,
      date: Date.now(),
      description,
      image: buffer,
      content: parsedContent,
      popularity: 2,
    });

    await newBlog.save();
    return new NextResponse(JSON.stringify(newBlog), { status: 200 });
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
