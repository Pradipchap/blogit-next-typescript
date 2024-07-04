import { CookieInterface, LoginResult } from "@/types/dataTypes";
import setCookie from "./setCookie";

export default function updateProfile(
  data: {[name:string]:string},
  expiresIn: string,
  accessToken: string
) {
  const updatedData: CookieInterface = {
    accessToken,
    expiresIn: expiresIn,
    dateofbirth: data.dateofbirth,
    phone: data.phone,
    username: data.username,
    userID: data._id,
    image: data.image,
    email: data.email,
  };
  setCookie("blogit", updatedData, expiresIn);
}
