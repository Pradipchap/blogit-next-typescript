import { NextRequest, NextResponse } from "next/server";
import getApiCookie from "./getApiCookie";
import jwt from "jsonwebtoken";

async function authenticatedMiddleware(req: NextRequest) {
  try {
    const cookie = getApiCookie(req);
    if (cookie) {
      const accessToken = cookie.accessToken;
      const isCorrect = await jwt.verify(accessToken, process.env.JWT_SECRET);
      if (isCorrect) {
        return isCorrect.userID;
      } else {
        throw "";
      }
    } else {
      throw "";
    }
  } catch (error) {
    return new NextResponse("Not Authenticated", { status: 400 });
  }
}

export default authenticatedMiddleware;
