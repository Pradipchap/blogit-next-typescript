import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest, res:Response) => {
  try {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/api/auth/callback/google&response_type=code&scope=profile email`;
    // res.redirect(url);
    console.log(url);
    return new NextResponse(url);
  } catch (error) {
    return new NextResponse("", { status: 500 });
  }
};

export { GET };
