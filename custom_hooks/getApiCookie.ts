import { CookieInterface, LoginResult } from "@/types/dataTypes";
import { NextRequest } from "next/server";

export default function getApiCookie(request: NextRequest) {
  const cookie = request.cookies.get("blogit")?.value;
  console.log(cookie);
  if (typeof cookie !== "undefined") {
    return JSON.parse(cookie) as CookieInterface;
  } else {
    return null;
  }
}
