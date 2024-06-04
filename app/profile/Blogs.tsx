"use client";
import React, { Key, useState } from "react";
import Select from "@/components/Home/MainBlogs/Select";
import Blogpage from "@/components/Home/Blogpage";
import { TabsInterface } from "@/types/componentTypes";
import { BASE_URL } from "@/utils/constants";
export default function Blogs() {
  const options: TabsInterface[] = [
    { key: "/blogs/myblogs", label: "Published" },
    { key: "/drafts", label: "Drafts" },
  ];
  const [option, setOption] = useState<TabsInterface>(options[0]);
  function onSelectionChange(key: TabsInterface) {
    setOption(key);
  }
  return (
    <div className="relative h-full w-full">
      {" "}
      <Select
        options={options}
        onSelectionChange={onSelectionChange}
        currentOption={option.key}
        className="justify-center"
      />
      <div className="m-auto">
        <Blogpage
          api={`${BASE_URL}/api${option.key}`}
          type={option.label === "Drafts" ? "drafts" : "blogs"}
        />
      </div>{" "}
    </div>
  );
}
