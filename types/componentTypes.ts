import { SUBMIT_STATUS } from "@/utils/constants";
import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react";

export interface TabsInterface {
  label: string;
  key: string;
}

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  variant?: "primary" | "muted";
  icon?: string;
  iconClassName?: string;
  iconAlignment?: "left" | "right";
  isLoading?: boolean;
  children: React.ReactNode;
  status?: SUBMIT_STATUS;
}
