import { TNavItems } from "@/types/navTypes";
import ProfileImg from "@/public/profile.jpg";

export enum ErrorStatus {
  network_status = "Network connection Error",
  unknown_error = "Sorry something wrong happended",
}

export enum SUBMIT_STATUS {
  SUCCESS = "success",
  FAILED = "failed",
  INACTIVE = "inactive",
  PROCESSING = "processing",
}

export const Navlist: TNavItems[] = [
  { name: "Create", href: "/create", iconName: "Write" },
];
export const ProfileNavList: TNavItems[] = Navlist;

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export enum ErrorCodes {
  NORMAL = 2000,
  EMAIL_NOT_VERIFIED = 1000,
  USER_NOT_FOUND = 1001,
  WRONG_CODE = 1002,
  USER_EXISTS = 1003,
  USER_NOT_AUTHENTICATED = 1004,
}

const ErrorMessages = [
  [2000, "Something wrong happended"],
  [1000, "Email not verified"],
  [10001, "User not found"],
];

export const NUMBER_REGEX = /^[0-9]*$/;

export const blogImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&usqp=CAU";

export const profileImage = ProfileImg;
export const PopularPostsList = [
  "Coding",
  "War",
  "Science",
  "Politics",
  "Sport",
  "Health",
  "Economy",
  "World",
  "Life",
  "Education",
  "ChatGPT",
  "AI",
  "Religion",
  "Spirituality",
];
