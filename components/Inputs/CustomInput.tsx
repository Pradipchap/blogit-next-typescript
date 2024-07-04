"use client";
import classNames from "@/utils/classNames";
import  { InputHTMLAttributes, useState } from "react";
import Icon from "../Icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  error?: string;
}

export default function CustomInput({
  className,
  labelClassName,
  label,
  name,
  error,
  type = "text",
  ...rest
}: InputProps) {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div className="relative flex flex-col">
      {label && (
        <label htmlFor={name} className={classNames("", labelClassName)}>
          {label}
        </label>
      )}

      <div className="relative pb-4 pt-2">
        <input
          name={name}
          type={isHidden ? type : "text"}
          {...rest}
          className={classNames(
            "outline-none px-2 w-full py-2 bg-gray-50 border-gray-300 border rounded disabled:text-gray-400",
            className
          )}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute top-1/2 right-[3%] -translate-y-1/2"
            onClick={() => setIsHidden((isHidden) => !isHidden)}
          >
            <Icon name={isHidden ? "EyeSlash" : "Eye"} className="text-sm" />
          </button>
        )}
        {error && (
          <p className="text-red-500 text-xs absolute bottom-0 right-[2%]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
