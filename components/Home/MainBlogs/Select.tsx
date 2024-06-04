import React, { Key, useState } from "react";
import { TabsInterface } from "@/types/componentTypes";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "@/utils/classNames";

interface selectTabProps {
  className?: string;
  options: TabsInterface[];
  onSelectionChange: (tab: TabsInterface) => void;
  currentOption: string;
}

export default function App({
  className,
  options,
  onSelectionChange,
  currentOption = options[0].key,
}: selectTabProps) {
  return (
    <ul
      className={classNames(
        "sticky top-[56px] bg-white flex gap-2 items-center my-2 border-b border-slate-200 w- px-2",
        className
      )}
    >
      {options.map((element) => (
        <li
          key={element.key}
          className={`${
            currentOption === element.key ? " border-b" : ""
          } px-3 border-black py-2`}
          onClick={() => {
            onSelectionChange(element);
          }}
        >
          {element.label}
        </li>
      ))}
    </ul>
  );
}
