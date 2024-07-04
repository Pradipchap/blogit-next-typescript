
import classNames from "@/utils/classNames";
import Icon from "./Icon";
import { TNavItems } from "@/types/navTypes";
import Link from "next/link";

export default function LinkWithIcon(props: TNavItems) {
  const {
    iconName,
    iconClassName,
    className,
    iconAlignment = "left",
    name,
    ...rest
  } = props;

  return (
    <Link
      {...rest}
      className={classNames(
        "flex text-base p-2 items-center justify-center gap-2",
        className
      )}
    >
      {iconName && iconAlignment === "left" && (
        <span className="mr-1">
          <Icon name={iconName || ""} className={iconClassName} />
        </span>
      )}
      {name}

      {iconName && iconAlignment === "right" && (
        <span className="ml-1">
          <Icon name={iconName} className={iconClassName} />
        </span>
      )}
    </Link>
  );
}
