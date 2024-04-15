"use client";
import React, { useState } from "react";
import BlogPage from "../Blogpage";
import Select from "./Select";
import { useSearchParams } from "next/navigation";
import { TabsInterface } from "@/types/componentTypes";
import { BASE_URL } from "@/utils/constants";
export default function MainBlogs() {
  
  const options: TabsInterface[] = [
    { key: "feeds", label: "Feeds" },
    { key: "foryou", label: "For You" },
  ];
  const [option, setOption] = useState<TabsInterface>(options[0]);
  const params = useSearchParams();
  const feedQuery = params.get("option") as string;

  return (
    <div className="relative h-full w-full">
      {" "}
      <Select options={options} setOption={setOption} currentOption={option} />
      <div className="m-auto">
        <BlogPage
          api={`${BASE_URL}/api/blogs?option=${feedQuery}`}
        />
      </div>{" "}
    </div>
  );
}
