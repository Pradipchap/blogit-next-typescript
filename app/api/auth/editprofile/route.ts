import { NextRequest, NextResponse } from "next/server";
import { del, put } from "@vercel/blob";

import { optimizeProfileImage } from "@/custom_hooks/optimizeImage";
import User from "@/models/userModel";
import getApiCookie from "@/custom_hooks/getApiCookie";

import { ErrorCodes } from "@/utils/constants";
import sendError from "@/utils/sendError";

const POST = async (req: NextRequest, res: NextResponse) => {
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
        ...(imageUrl !== "" ? { image: imageUrl } : {}),
      },
      { new: true }
    );

    if (typeof userData.image !== undefined && userData.image !== "") {
      console.log(userData.image);
      await del(userData.image).catch((err) => {
        throw "previous image not deleted";
      });
    }
    console.log(await updatedProfile);
    return new NextResponse(
      JSON.stringify({
        message: "profile updated successfully",
        profile: updatedProfile,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        errorCode: ErrorCodes.NORMAL,
        errorMessage: error,
      }),
      {
        status: 500,
      }
    );
  }
};

export { POST };
