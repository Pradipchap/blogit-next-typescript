import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import optimizeImage from "@/custom_hooks/optimizeImage";
import Blog from "@/models/blogModel";
import { ErrorCodes } from "@/utils/constants";
import getApiCookie from "@/custom_hooks/getApiCookie";
import sendError from "@/utils/sendError";
import { put } from "@vercel/blob";
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
    let imageUrl = "";
    if (imageFile.size > 0) {
      const fileName = imageFile.name.split(".")[0];
      const optimizedImage = await optimizeImage(imageFile as File);

      const imageDetails = await put(`${fileName}.webp`, optimizedImage, {
        access: "public",
      });
      imageUrl = imageDetails.url;
    }
    const parsedContent = await JSON.parse(content as string);
    if (blogId) {
      await Blog.findByIdAndUpdate(blogId, {
        userid,
        title,
        genre,
        description,
        ...(imageUrl !== "" ? { image: imageUrl } : {}),
        content: parsedContent,
      });
    } else {
      await Blog.create({
        userid,
        title,
        genre,
        date: Date.now(),
        description,
        image: imageUrl,
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
