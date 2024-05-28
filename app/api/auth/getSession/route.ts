import getApiCookie from "@/custom_hooks/getApiCookie";
import client from "@/utils/redixClient";
import { NextRequest, NextResponse } from "next/server";
import authenticatedMiddleware from "@/custom_hooks/authenticatedMiddleware";

const GET = async (req: NextRequest) => {
  try {
    const userID = await authenticatedMiddleware(req);
    console.log(userID);
    const userSession = (await client).hGetAll(`user-session:${userID}`);
    await userSession.then((data) => {
      console.log(data);
    });
    return new NextResponse(JSON.stringify(userSession), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("", { status: 500 });
  }
};

export { GET };
