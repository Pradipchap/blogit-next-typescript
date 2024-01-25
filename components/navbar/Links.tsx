import Link from "next/link";
import React from "react";
import { TNavItems } from "@/types/navTypes";
import classNames from "@/utils/classNames";
import Icon from "../Icon";
export default function Links({
  name,
  url = "#",
  className,
  containerClassName,
  iconName = "Notification",
  iconClassName,
}: TNavItems) {
  return (
    <Link
      href={url}
      className={classNames(
        "flex justify-center items-center gap-2",
        containerClassName
      )}
    >
      <Icon name={iconName} className={iconClassName+" text-black"} />
      <p className={classNames("text-black", className)}>{name}</p>
    </Link>
  );
}
