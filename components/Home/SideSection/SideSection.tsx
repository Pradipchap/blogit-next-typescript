import React from "react";
import PopularPosts from "./PopularPosts";
import PopularTopics from "./PopularTopics";

export default function SideSection() {
  return (
    <div className="flex flex-col gap-10 items-center mt-10">
      <PopularPosts />
      <PopularTopics />
    </div>
  );
}
