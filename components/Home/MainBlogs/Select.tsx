import React, { Key, useState } from "react";
import { TabsInterface } from "@/types/componentTypes";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "@/utils/classNames";

interface selectTabProps {
  className?: string;
}

export default function App({ className }: selectTabProps) {
  const options: TabsInterface[] = [
    { key: "feeds", label: "Feeds" },
    { key: "popular", label: "Most Popular" },
  ];
  const [option, setOption] = useState<TabsInterface>(options[0]);
  const router = useRouter();
  const params = useSearchParams();
  function onSelectionChange(key: Key) {
    const selectedOption =
      options.find((item) => {
        return item.key === key.toString();
      }) || options[0];
    setOption(selectedOption);
    router.push(`?option=${selectedOption.key}`);
  }
  const currentOption = params.get("option") || options[0].key;

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
            onSelectionChange(element.key);
          }}
        >
          {element.label}
        </li>
      ))}
    </ul>
  );
}
