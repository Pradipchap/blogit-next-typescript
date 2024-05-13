import { NextResponse, type NextRequest } from "next/server";
import { BASE_URL } from "./utils/constants";

const allowedOrigins = [
  "https://blogit-next-typescript-pradipchaps-projects.vercel.app",
  "https://blogit-next-typescript-pradipchap.vercel.app",
  "https://blogit-next-typescript.vercel.app",
  "https://lucent-longma-3d7e84.netlify.app",
];

const corsHeaders = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function middleware(request: NextRequest) {
  try {
    // Checking authenticated routes
    const protectedRoutes = ["/create", "/profile"];
    const userToken = request.cookies.get("next-auth.session-token")?.value;
    const currentUrl = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(currentUrl);

    if (isProtectedRoute && !userToken) {
      return NextResponse.redirect(
        new URL(`${BASE_URL}/api/auth/signin`, request.nextUrl)
      );
    }

    // Handle CORS
    const origin = request.headers.get("origin") || "";
    const isAllowedOrigin = allowedOrigins.includes(origin);

    if (isAllowedOrigin) {
      request.headers.set("Access-Control-Allow-Origin", origin);
    }

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      const preflightHeaders = {
        ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
        ...corsHeaders,
      };
      return NextResponse.json({}, { headers: preflightHeaders });
    }

    // Handle simple requests
    const response = NextResponse.next();

    if (isAllowedOrigin) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }

    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.error();
  }
}

export const config = { 
  api: {
    bodyParser: false, // Disables body parsing, as it's not needed for this middleware
  },
};
