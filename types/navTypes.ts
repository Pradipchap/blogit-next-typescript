import { LinkProps } from "next/link";
import {
  ReactNode,
} from "react";
export interface TNavItems extends LinkProps {
  name?: ReactNode;
  iconName?: string;
  className?: string;
  iconClassName?: string;
  iconAlignment?: "right" | "left";
}
