import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { connectToDB } from "@/utils/database";

export default async function getServerSession() {
  try {
    const cookie = await cookies().get("blogit")?.value;
    if (typeof cookie === "undefined") {
      throw "";
    }
    const session = await JSON.parse(cookie);
    const accessToken = await session.accessToken;
    const isCorrect = await jwt.verify(accessToken, process.env.JWT_SECRET);
    if (isCorrect) {
      await connectToDB();
      const data = await User.findById(isCorrect.userID);
      return data;
    } else {
      throw "";
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
