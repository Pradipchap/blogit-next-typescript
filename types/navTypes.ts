import { LinkProps } from "next/link";
import { AnchorHTMLAttributes, HtmlHTMLAttributes, LinkHTMLAttributes, ReactNode } from "react";

export const Navlist: TNavItems[] = [
  { name: "Create", href: "/create", iconName: "Write" },
  {
    name: "Notifications",
    href: "/profile/notifications",
    iconName: "Notification",
  },
];
export const ProfileNavList: TNavItems[] = Navlist;
export interface TNavItems extends LinkProps {
  name?:ReactNode
  iconName?: string;
  className?: string;
  iconClassName?: string;
  iconAlignment?: "right" | "left";
}
