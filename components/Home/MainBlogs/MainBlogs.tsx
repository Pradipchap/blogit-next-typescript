"use client";
import React, { useEffect, useState } from "react";
import BlogPage from "../Blogpage";
import Select from "./Select";
const options = ["Featured", "For you"];
import { useSearchParams } from "next/navigation";
export default function MainBlogs() {
  const [pageno, setpageno] = useState(1);
  const [feed, setfeed] = useState("foryou");
  const params = useSearchParams();
  useEffect(() => {
    const feedQuery = params.get("feed") as string;
    setfeed(feedQuery);
  }, [params]);

  return (
    <div className="w-[60%]">
      <Select />

      <BlogPage api={`http://localhost:3000/api/blogs?pageno=${pageno}`} />
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
