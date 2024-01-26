import Blogpage from "@/components/Home/Blogpage";
import { BASE_URL } from "@/utils/constants";
import React from "react";

export default function page() {
  return (
    <div>
      <Blogpage api={`${BASE_URL}/api/blogs/myblogs`} />
    </div>
  );
}
