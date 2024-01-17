"use client";
import React from "react";
import BlogPage from "../Blogpage";

export default function SideBlogs() {
  return (
    <div className="relative w-[35%]">
      <div className="fixed w-[35%] h-max right-0"><BlogPage /></div>
    </div>
  );
}
