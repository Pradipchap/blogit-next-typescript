import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest, res: NextResponse) => {
  const code = req.nextUrl.searchParams.get("code");

  try {
    // Exchange authorization code for access token
    const data = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      body: JSON.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        redirect_uri: "http://localhost:3000/api/auth/callback/google",
        grant_type: "authorization_code",
      }),
    });

    const { access_token, id_token } = await data.json();

    // Use access_token or id_token to fetch user profile
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const { data: profile } = await response.json();
    // Code to handle user authentication and retrieval using the profile data
    return NextResponse.redirect("/");
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.redirect("/login");
  }
};

export { GET };
