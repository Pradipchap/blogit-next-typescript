import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

export default async function getServerSession() {
  try {
    const cookie = cookies().get("blogit")?.value;
    if (typeof cookie === "undefined") {
      throw "";
    }
    const session = JSON.parse(cookie);
    const accessToken = session.accessToken;
    const isCorrect = await jwt.verify(accessToken, process.env.JWT_SECRET);
    if (isCorrect) {
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
