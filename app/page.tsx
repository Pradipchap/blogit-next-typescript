"use client"
import Blogpage from "@/components/Home/Blogpage";
import MainBlogs from "@/components/Home/MainBlogs/MainBlogs";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    function usWebWorker() {
      if (typeof Worker === "undefined") {
      } else {
        const w = new Worker("../workers/text.ts");
        w.onmessage = function (event) {
          console.log(event.data);
        };
      }
    }
    usWebWorker();
  }, []);

  return (
    <>
      <div className="h-max flex justify-around w-full mt-5 min-h-[calc(100vh-76px)] px-2 md:px-20">
        <div className="w-[70%] h-full">
          <MainBlogs />
        </div>
        <div className="border-l border-gray-200 sideblog w-[30%] sticky top-[76px] h-[60rem] hidden md:block px-5">
          <Blogpage />
        </div>
      </div>
    </>
  );
}
