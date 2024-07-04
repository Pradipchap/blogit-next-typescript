import { connectToDB } from "@/utils/database";
import Draft from "@/models/draftModel";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/utils/NextAuthOptions";
import getApiCookie from "@/custom_hooks/getApiCookie";
import { ErrorInterface } from "@/types/dataTypes";
import { ErrorCodes } from "@/utils/constants";
import sendError from "@/utils/sendError";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const GET = async (request: NextRequest, response: NextResponse) => {
  const pageNo =
    (await Number(request.nextUrl.searchParams.get("pageno"))) || 0;

  try {
    const session = await getApiCookie(request);
    if (!session) {
      return sendError(
        ErrorCodes.USER_NOT_AUTHENTICATED,
        "Sorry you are not autheticated"
      );
    }
    await connectToDB();
    const noOfBlogs = await Draft.countDocuments({});
    const skippingNumber =
      pageNo === 0 ? 0 : pageNo === 1 ? 0 : (pageNo - 1) * 5;
    const drafts = await Draft.find({ userid: session.userID })
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
export { GET };
