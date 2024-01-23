import classNames from "@/utils/classNames";
import React, { ReactNode } from "react";

interface props {
  name: ReactNode;
  type?: "submit" | "button";
  operation: () => void;
  className?: string;
}
export default function Button({
  name,
  type = "button",
  operation,
  className,
}: props) {
  return (
    <button
      type={type}
      className={classNames(
        "px-3 py-1 text-lg w-max h-max bg-white border-black border text-black rounded-sm text-center hover:bg-black hover:text-white transition-all duration-300",
        className
      )}
      onClick={operation}
    >
      {name}
    </button>
  );
}
