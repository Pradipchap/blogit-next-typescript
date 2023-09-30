import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import Blog from "@/models/blogModel";

const POST = async (request: NextRequest) => {
  const data = await request.formData();
  try {
    await connectToDB();

    const { title, genre, description, userid, content, image } =
      Object.fromEntries(data.entries());
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
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};

export { POST };

async function optimizeImage(image: File) {
  const x = await image.arrayBuffer();
  const buffer = Buffer.from(x);
  const optimizedImage = await sharp(buffer)
    .jpeg({ mozjpeg: true })
    .resize({ width: 500, height: 400 })
    .toBuffer()
    .then((data) => {
      const imageData = data.toString("base64");
      const dataURL = `data:image/jpeg;base64,${imageData}`;

      return dataURL;
    });
  return optimizedImage;
}
