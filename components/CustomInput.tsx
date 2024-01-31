import classNames from "@/utils/classNames";
import React, { InputHTMLAttributes } from "react";

export default function CustomInput({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...rest}
      className={classNames(
        "outline-none px-3 py-2 bg-gray-50 border-gray-300 border rounded disabled:text-gray-400",
        className
      )}
    />
  );
}
