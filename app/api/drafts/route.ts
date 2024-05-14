import { connectToDB } from "@/utils/database";
import Draft from "@/models/draftModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/utils/NextAuthOptions";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const GET = async (request: NextRequest, response: NextResponse) => {
  const pageNo =
    (await Number(request.nextUrl.searchParams.get("pageno"))) || 0;

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("you are not logged in");
    }
    await connectToDB();
    const noOfBlogs = await Draft.countDocuments({});
    const skippingNumber =
      pageNo === 0 ? 0 : pageNo === 1 ? 0 : (pageNo - 1) * 5;
    console.log(skippingNumber);
    const drafts = await Draft.find({ userid: session.user.id })
      .populate("userid")
      .sort({ date: -1 })
      .limit(5)
      .skip(skippingNumber);

    return new NextResponse(
      JSON.stringify({
        blogs: drafts,
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
