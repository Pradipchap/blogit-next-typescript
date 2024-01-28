import React from "react";
import classNames from "@/utils/classNames";
import Icon from "./Icon";
import { ButtonProps } from "@/types/componentTypes";

export default function Button(props: ButtonProps) {
  const {
    icon,
    iconClassName,
    className,
    variant = "primary",
    iconAlignment = "left",
    children,
    isLoading = false,
    ...rest
  } = props;

  const buttonClasses = classNames(
    "p-2 text-white bg-customBlue rounded-md px-3 w-fit hover:bg-opacity-90 transition-all ease-linear duration-300 text-sm flex items-center justify-center",
    variant === "primary"
      ? "border-none"
      : "border-customBlue border text-gray-700 bg-transparent",
    className
  );

  return (
    <button {...rest} className={buttonClasses} disabled={isLoading}>
      {icon && iconAlignment === "left" && (
        <span className="mr-1">
          <Icon name={icon} className={iconClassName} />
        </span>
      )}
      {children}{" "}
      {isLoading && (
        <span className="ml-1">
          <Icon name="Loading" className="ml-2 animate-spin text-white" />
        </span>
      )}
      {icon && iconAlignment === "right" && (
        <span className="ml-1">
          <Icon name={icon} className={iconClassName} />
        </span>
      )}
    </button>
  );
}
