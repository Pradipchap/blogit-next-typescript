import { LoginResult } from "@/types/dataTypes";
import { NextRequest } from "next/server";

export default function getApiCookie(requeset: NextRequest) {
  const cookie = requeset.cookies.get("blogit")?.value;
  if (cookie) {
    return JSON.parse(cookie) as LoginResult;
  } else {
    return null
  }
}
