export { default } from "next-auth/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { BASE_URL } from "./utils/constants";

export async function middleware(request: NextRequest) {
  const redirectUrl = ["/create", "/profile"];
  const userToken = request.cookies.get("next-auth.session-token")?.value;
  const currentUrl = request.nextUrl.pathname;
  const isProtectedUrl = redirectUrl.find((element) => element === currentUrl);
  const matchUrl = !!isProtectedUrl;

  if (matchUrl && !userToken) {
    return NextResponse.redirect(
      new URL(`${BASE_URL}/api/auth/signin`, request.nextUrl)
    );
  }

  // Response
  const response = NextResponse.next();

  // Return
  return response;
}

// See "Matching Paths" below to learn more

export const config = { matcher: ["/profile", "/create"] };
