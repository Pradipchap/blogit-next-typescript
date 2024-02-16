import Draft from "@/models/draftModel";
import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest, response: NextResponse) => {
  const id = await request.nextUrl.searchParams.get("draftid");
  try {
    const blog = await Draft.findById(id).populate("userid");
    return new NextResponse(
      JSON.stringify({
        blog,
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
