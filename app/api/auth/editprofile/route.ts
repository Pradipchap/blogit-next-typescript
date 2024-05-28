import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import optimizeImage, {
  optimizeProfileImage,
} from "@/custom_hooks/optimizeImage";
import User from "@/models/userModel";
import getApiCookie from "@/custom_hooks/getApiCookie";

const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const userData = getApiCookie(req);
    if (!userData) {
      throw "";
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

    const updatedProfile = await User.findByIdAndUpdate(userData.userID, {
      ...(dateofbirth !== "" ? { dateofbirth: dateofbirth } : {}),
      ...(phone !== "" ? { phone: phone } : {}),
      ...(imageUrl !== "" ? { image: imageUrl } : {}),
    });
    return new NextResponse(
      JSON.stringify({ message: "profile updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "something wrong" }), {
      status: 500,
    });
  }
};

export { POST };
