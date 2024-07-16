import { NextRequest, NextResponse } from "next/server";
import { del, put } from "@vercel/blob";

import { optimizeProfileImage } from "@/custom_hooks/optimizeImage";
import User from "@/models/userModel";
import getApiCookie from "@/custom_hooks/getApiCookie";

import { ErrorCodes } from "@/utils/constants";
import sendError from "@/utils/sendError";
import { connectToDB } from "@/utils/database";

const POST = async (req: NextRequest, res: NextResponse) => {
  const client = await connectToDB();
  if (!client) {
    return sendError(ErrorCodes.NORMAL, "Failed to connect to the database");
  }
  const session = await client.startSession();
  await session.startTransaction();
  try {
    const userData = getApiCookie(req);
    if (!userData) {
      return sendError(ErrorCodes.USER_NOT_FOUND, "sorry user not found");
    }
    const data = await req.formData();
    const { image, dateofbirth, phone } = Object.fromEntries(data.entries());
    const profileImage = image as File;
    let imageUrl = "";
    if (profileImage.size > 0) {
      const fileName = profileImage.name.split(".")[0];
      const optimizedImage = await optimizeProfileImage(profileImage);

      const imageDetails = await put(`${fileName}.webp`, optimizedImage, {
        access: "public",
      });
      imageUrl = imageDetails.url;
    }

    const updatedProfile = await User.findByIdAndUpdate(
      userData.userID,
      {
        ...(dateofbirth !== "" ? { dateofbirth: dateofbirth } : {}),
        ...(phone !== "" ? { phone: phone } : {}),
        ...(phone !== "" ? { image: imageUrl } : {}),
      },
      { new: true, session }
    );

    if (typeof userData.image !== undefined && userData.image !== "") {
      if (profileImage.size !== 0)
        await del(userData.image).catch((err) => {
          throw "previous image not deleted";
        });
    }
    await session.commitTransaction();
    return new NextResponse(
      JSON.stringify({
        message: "profile updated successfully",
        profile: updatedProfile,
      }),
      { status: 200 }
    );
  } catch (error) {
    await session.abortTransaction();
    return new NextResponse(
      JSON.stringify({
        errorCode: ErrorCodes.NORMAL,
        errorMessage: error,
      }),
      {
        status: 500,
      }
    );
  } finally {
    await session.endSession();
  }
};

export { POST };
