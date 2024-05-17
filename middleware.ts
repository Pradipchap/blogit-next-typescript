export { default } from "next-auth/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { BASE_URL } from "./utils/constants";

const allowedOrigins = [
  "https://blogit-next-typescript-pradipchaps-projects.vercel.app",
  "https://blogit-next-typescript-pradipchap.vercel.app",
  "https://blogit-next-typescript.vercel.app",
  "https://lucent-longma-3d7e84.netlify.app",
];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function middleware(request: NextRequest) {
  // checking authenticated routes

  const redirectUrl = ["/create", "/profile"];
  const userToken = request.cookies.get("blogit")?.value;
  const currentUrl = request.nextUrl.pathname;
  const isProtectedUrl = redirectUrl.find((element) => element === currentUrl);
  const matchUrl = !!isProtectedUrl;

  if (matchUrl && !userToken) {
    return NextResponse.redirect(
      new URL(`${BASE_URL}/api/auth/signin`, request.nextUrl)
    );
  }

  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);
  // / Handle preflighted requests
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    console.log("is allowed origin", origin);
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export const config = { matcher: ["/profile", "/create", "/api/:path"] };
