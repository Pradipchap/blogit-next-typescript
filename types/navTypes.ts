import { StaticImageData } from "next/image";

import write from "@/public/Icons/write.svg";
import Notifications from "@/public/Icons/Notifications.svg";
export const Navlist: TNavItems[] = [
  { name: "Create", url: "/create", svg: write },
  { name: "Notifications", url: "/profile/notifications", svg: Notifications },
];
export const ProfileNavList: TNavItems[] = [...Navlist];
export interface TNavItems {
  name: string;
  url: string;
  operation?: () => void;
  svg?: StaticImageData;
}
