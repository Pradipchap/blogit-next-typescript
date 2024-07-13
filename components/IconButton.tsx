import { ButtonHTMLAttributes } from "react";
import Icon from "./Icon";
import classNames from "@/utils/classNames";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: string;
  iconClassName?: string;
}
export default function IconButton({
  iconName,
  iconClassName,
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      {...rest}
      className={classNames(
        "hover:bg-gray-200 transition-all duration-300 rounded-full flex justify-center items-center px-2 py-1",
        className
      )}
    >
      {" "}
      <Icon
        name={iconName}
        className={classNames("text-black", iconClassName)}
      />
    </button>
  );
}
