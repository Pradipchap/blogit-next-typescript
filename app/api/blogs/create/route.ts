import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/blogModel";
const POST = async (request: NextRequest) => {
  const { title, genre, description, image, content, popularity } =
    await request.json();
  try {
    await connectToDB();
    const newBlog = new Blog({
      title,
      genre,
      description,
      image,
      content,
      popularity,
    });
    await newBlog.save();
    return new NextResponse(JSON.stringify(newBlog), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};

export { POST };
