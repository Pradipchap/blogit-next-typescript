import React from "react";
import classNames from "@/utils/classNames";
import Icon from "./Icon";
import { ButtonProps } from "@/types/componentTypes";

export default function Button(props: ButtonProps) {
  const {
    icon,
    iconClassName,
    variant = "primary",
    iconAlignment = "left",
    children,
    className,
    isLoading = false,
    ...rest
  } = props;


  return (
    <button {...rest} className={classNames("px-3 py-2 rounded-sm flex items-center justify-center",className)} disabled={isLoading}>
      {icon && iconAlignment === "left" && (
        <span className="mr-1">
          {/* <Icon name={icon} className={iconClassName} /> */}
        </span>
      )}
      {children}{" "}
      {isLoading && (
        <span className="ml-1">
          {/* <Icon name="Loading" className="ml-2 animate-spin text-white" /> */}
        </span>
      )}
      {icon && iconAlignment === "right" && (
        <span className="ml-1">
          {/* <Icon name={icon} className={iconClassName} /> */}
        </span>
      )}
    </button>
  );
}
