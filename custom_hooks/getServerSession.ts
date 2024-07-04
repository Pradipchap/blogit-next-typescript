import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { connectToDB } from "@/utils/database";
import mongoose from "mongoose";

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
      const data = await User.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId.createFromHexString(isCorrect.userID),
          },
        },
        {
          $project: {
            _id: 0, // Exclude the original _id field
            userID: { $toString: "$_id" }, // Include the _id field as userID
            email: 1,
            username: 1,
            image: 1,
            phone: 1,
          },
        },
      ]);

      return data[0];
    } else {
      throw "";
    }
  } catch (error) {
    return null;
  }
}
