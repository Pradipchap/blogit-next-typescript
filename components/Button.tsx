import classNames from "@/utils/classNames";
import Icon from "./Icon";
import { ButtonProps } from "@/types/componentTypes";
import { SUBMIT_STATUS } from "@/utils/constants";

export default function Button(props: ButtonProps) {
  const {
    icon,
    iconClassName,
    variant = "primary",
    iconAlignment = "left",
    children,
    className,
    isLoading = false,
    status = SUBMIT_STATUS.INACTIVE,
    ...rest
  } = props;

  const buttonStatus =
    status === SUBMIT_STATUS.FAILED
      ? {
          backgroundColor: "bg-red-700 hover:bg-red-600",
          icon: "Close",
        }
      : status === SUBMIT_STATUS.SUCCESS
      ? {
          backgroundColor: "bg-green-700 hover:bg-green-600",
          icon: "Check",
        }
      : status === SUBMIT_STATUS.PROCESSING
      ? {
          backgroundColor: "bg-yellow-700 hover:bg-yellow-600",
          icon: "Loading",
        }
      : {};

  return (
    <button
      {...rest}
      className={classNames(
        "px-3 py-2 rounded-sm flex items-center justify-center",
        className,
        buttonStatus.backgroundColor
      )}
    >
      {icon && iconAlignment === "left" && (
        <span className="mr-1">
          <Icon name={icon} className={iconClassName} />
        </span>
      )}
      {status !== SUBMIT_STATUS.INACTIVE ? (
        <span className="ml-1">
          {buttonStatus.icon && (
            <Icon name={buttonStatus.icon} className="text-white text-xl" />
          )}
        </span>
      ) : (
        children
      )}
      {icon && iconAlignment === "right" && (
        <span className="ml-1">
          <Icon name={icon} className={iconClassName} />
        </span>
      )}
    </button>
  );
}
