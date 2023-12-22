import React, { Key } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { TabsInterface } from "@/types/componentTypes";
import { useRouter, useSearchParams } from "next/navigation";

interface selectTabProps {
  options: TabsInterface[];
  itemClassName?: string;
  variant?: "solid" | "underlined" | "bordered" | "light";
  setOption: (option: TabsInterface) => void;
}

export default function App({
  options,
  itemClassName,
  variant = "underlined",
  setOption,
}: selectTabProps) {
  const router = useRouter();
  function onSelectionChange(key: Key) {
    console.log(key);
    const selectedOption =
      options.find((item) => {
        return item.key === key.toString();
      }) || options[0];
    router.push(`?option=${selectedOption.key}`);
  }
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        variant={variant}
        onSelectionChange={onSelectionChange}
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-red-600",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]",
        }}
      >
        {options.map((item) => {
          return <Tab key={item.key} title={<p>{item.label}</p>} />;
        })}
      </Tabs>
    </div>
  );
}
