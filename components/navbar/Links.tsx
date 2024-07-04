import Link from "next/link";
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
        "flex justify-center items-center gap-2 group",
        className
      )}
    >
      <Icon
        name={iconName}
        className={
          iconClassName + "text-black/70 text-base font-light group-hover:text-black"
        }
      />
      <p
        className={classNames(
          "text-black/70 text-base group-hover:text-black transition-all",
          className
        )}
      >
        {name}
      </p>
    </Link>
  );
}
