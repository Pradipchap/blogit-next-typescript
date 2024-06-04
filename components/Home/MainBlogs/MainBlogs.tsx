"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { TabsInterface } from "@/types/componentTypes";
import { BASE_URL } from "@/utils/constants";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("./Select"), { ssr: false });
const BlogPage = dynamic(() => import("../Blogpage"), { ssr: false });

export default function MainBlogs() {
  const params = useSearchParams();
  const feedQuery = params.get("option") || "feeds";
  console.log(feedQuery);
  return (
    <div className="relative h-full flex flex-col items-center">
      {" "}
      <Select />
      <div className="m-auto w-full items-center flex flex-col ">
        <BlogPage api={`${BASE_URL}/api/blogs?option=${feedQuery}`} />
      </div>{" "}
    </div>
  );
}
