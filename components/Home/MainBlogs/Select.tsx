import React, { Key } from "react";
import { TabsInterface } from "@/types/componentTypes";
import { useRouter } from "next/navigation";
import classNames from "@/utils/classNames";

interface selectTabProps {
  options: TabsInterface[];
  setOption: (option: TabsInterface) => void;
  currentOption: TabsInterface;
  className?: string;
}

export default function App({
  options,
  currentOption,
  setOption,
  className,
}: selectTabProps) {
  const router = useRouter();
  function onSelectionChange(key: Key) {
    const selectedOption =
      options.find((item) => {
        return item.key === key.toString();
      }) || options[0];
    setOption(selectedOption);
    router.push(`?option=${selectedOption.key}`);
  }
  return (
    <ul
      className={classNames(
        "sticky top-[56px] bg-white flex gap-2 items-center my-2 border-b border-slate-200 w-full px-2",
        className
      )}
    >
      {options.map((element) => (
        <li
          key={element.key}
          className={`${
            currentOption.key === element.key ? " border-b" : ""
          } px-3 border-black py-2`}
          onClick={() => {
            onSelectionChange(element.key);
          }}
        >
          {element.label}
        </li>
      ))}
    </ul>
  );
}
