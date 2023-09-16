import { connectToDB } from "@/utils/database";
import { useSearchParams } from "next/navigation";
import Blog from "@/models/blogModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
const GET = async (request: NextRequest, response: NextResponse) => {
  const pageNo = await Number(request.nextUrl.searchParams.get("pageno"));
  const session = await getServerSession(authOptions);
  if (session) {
    try {
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
        },
      );
    } catch (error) {
      return new Response(JSON.stringify({ error: error, status: 500 }));
    }
  } else {
    return new Response(
      JSON.stringify({ error: "sorry you are not logged in", status: 500 }),
    );
  }
};
export { GET };
