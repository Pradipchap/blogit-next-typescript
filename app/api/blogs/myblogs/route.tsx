import { connectToDB } from "@/utils/database";
import Blog from "@/models/blogModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/utils/NextAuthOptions";
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const GET = async (request: NextRequest, response: NextResponse) => {
  const pageNo = await Number(request.nextUrl.searchParams.get("pageno"));

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("you are not logged in");
    }
    await connectToDB();
    const noOfBlogs = await Blog.countDocuments({});
    const skippingNumber =
      pageNo === 0 ? 0 : pageNo === 1 ? 0 : (pageNo - 1) * 5;
    console.log(skippingNumber);
    const blogs = await Blog.find({ userid: session.user.id })
      .populate("userid")
      .sort({ date: -1 })
      .limit(5)
      .skip(skippingNumber);

    return new NextResponse(
      JSON.stringify({
        blogs: blogs,
        noOfBlogs: noOfBlogs,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }), { status: 500 });
  }
};
export { GET };
