import { TNavItems } from "@/types/navTypes";

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
  EMAIL_NOT_VERIFIED = 1000,
  USER_NOT_FOUND = 1001,
  WRONG_CODE = 1002,
  USER_EXISTS = 1003,
}

export const NUMBER_REGEX = /^[0-9]*$/;