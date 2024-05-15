"use client";

import dynamic from "next/dynamic";
const Blogpage = dynamic(() => import("@/components/Home/Blogpage"));
const MainBlogs = dynamic(() =>
  import("@/components/Home/MainBlogs/MainBlogs")
);

export const maxDuration = 60;
export default function Home() {
  return (
    <div className="h-max flex justify-around w-full mt-5 min-h-[calc(100vh-76px)] px-2 md:px-20">
      <div className="w-[70%] h-full">
        <MainBlogs />
      </div>
      <div className="border-l border-gray-200 sideblog w-[30%] sticky top-[76px] h-[60rem] hidden md:block px-5">
        <Blogpage />
      </div>
    </div>
  );
}
