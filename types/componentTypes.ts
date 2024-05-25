import { SUBMIT_STATUS } from "@/utils/constants";

export interface TabsInterface {
  label: string;
  key: string;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "muted";
  icon?: string;
  iconClassName?: string;
  iconAlignment?: "left" | "right";
  isLoading?: boolean;
  children: React.ReactNode;
  status?: SUBMIT_STATUS;
}
