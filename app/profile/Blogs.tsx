"use client";
import React, { useState } from "react";
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
  return (
    <div className="relative h-full w-full">
      {" "}
      <Select
        options={options}
        setOption={setOption}
        currentOption={option}
        className="justify-center"
      />
      <div className="m-auto">
        <Blogpage api={`${BASE_URL}/api${option.key}`} type={option.label==="Drafts"?"drafts":"blogs"}  />
      </div>{" "}
    </div>
  );
}
