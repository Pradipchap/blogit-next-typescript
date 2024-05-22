import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import Draft from "@/models/draftModel";
import authOptions from "@/utils/NextAuthOptions";
import getApiCookie from "@/custom_hooks/getApiCookie";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const POST = async (request: NextRequest) => {
  const data = await request.formData();

  try {
    const session = await getApiCookie(request);
    await connectToDB();
    const { title, content } = Object.fromEntries(data.entries());
    const parsedContent = await JSON.parse(content as string);
    const newDraft = await new Draft({
      userid: session?.userID,
      title,
      date: Date.now(),
      content: parsedContent,
      popularity: 2,
    });
    await newDraft.save();
    return new NextResponse(JSON.stringify(newDraft), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
};

export { POST };
