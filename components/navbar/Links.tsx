import Link from "next/link";
import React from "react";
import { TNavItems } from "@/types/navTypes";
import classNames from "@/utils/classNames";
import Icon from "../Icon";
export default function Links({
  name,
  href = "#",
  className,
  iconName = "Notification",
  iconClassName,
}: TNavItems) {
  return (
    <Link
      href={href}
      className={classNames(
        "flex justify-center items-center gap-2",
        className
      )}
    >
      <Icon name={iconName} className={iconClassName+" text-black"} />
      <p className={classNames("text-black", className)}>{name}</p>
    </Link>
  );
}
