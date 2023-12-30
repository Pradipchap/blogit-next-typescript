"use client";
import React, { Key, Suspense, useEffect, useState } from "react";
import BlogPage from "../Blogpage";
import Select from "./Select";
import { useSearchParams } from "next/navigation";
import { TabsInterface } from "@/types/componentTypes";
export default function MainBlogs() {
  const options: TabsInterface[] = [
    { key: "feeds", label: "Feeds" },
    { key: "foryou", label: "For You" },
  ];
  const [pageno, setpageno] = useState(1);
  const [option, setOption] = useState<TabsInterface>(options[0]);
  const params = useSearchParams();
  const feedQuery = params.get("option") as string;

  return (
    <div className="w-[60%]">
      <Select options={options} setOption={setOption} currentOption={option} />
      <BlogPage
        api={`http://localhost:3000/api/blogs?pageno=${pageno}&option=${feedQuery}`}
      />
      <div className="pagination flex gap-4">
        <button onClick={() => setpageno((page) => page + 1)}>prev</button>
        <p>{pageno}</p>
        <button
          onClick={() => setpageno((page) => page - 1)}
          disabled={pageno <= 1}
        >
          next
        </button>
      </div>
    </div>
  );
}
