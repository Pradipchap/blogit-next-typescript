"use client";
import React, { useState } from "react";
import BlogPage from "../Blogpage";
import Select from "./Select";
const options = ["Featured", "For you"];

export default function MainBlogs() {
  const [pageno, setpageno] = useState(1);
  return (
    <div className="w-[60%]">
      <BlogPage api={` http://localhost:3000/api/blogs?pageno=${pageno}`} />
      <div className="pagination">
        <button onClick={() => setpageno(2)}>prev</button>
        <p>{pageno}</p>
        <button onClick={() => setpageno(1)}>next</button>
      </div>
    </div>
  );
}
