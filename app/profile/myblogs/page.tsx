import Blogpage from "@/components/Home/Blogpage";
import React from "react";

export default function page() {
  return (
    <div>
      <Blogpage api="http://localhost:3000/api/blogs/myblogs" />
    </div>
  );
}
