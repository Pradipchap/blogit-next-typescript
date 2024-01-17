import { ReactNode } from "react";

export const Navlist: TNavItems[] = [
  { name: "Create", url: "/create", iconName: "Write" },
  {
    name: "Notifications",
    url: "/profile/notifications",
    iconName: "Notification",
  },
];
export const ProfileNavList: TNavItems[] = Navlist;
export interface TNavItems {
  name: ReactNode;
  url?: string;
  iconName?: string;
  className?: string;
  containerClassName?: string;
  iconClassName?: string;
}
