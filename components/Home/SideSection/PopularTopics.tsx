import { BASE_URL } from "@/utils/constants";
import React from "react";

const PopularPostsList = ["science", "politics", "sport", "election", "health"];
export default async function PopularTopics() {
  // const response = await fetch(`${BASE_URL}/api/blogs/populartopics`);
  // if (!response.ok) {
  //   return <p>Something went wrong</p>;
  // }
  // const data: string[] = await response.json();
  const data = PopularPostsList;

  return (
    <div>
      <p className="mb-8 font-medium text-xl">Popular Topics</p>
      <div className="flex items-center flex-wrap gap-2">
        {data.map((item) => {
          return (
            <button
              key={item}
              className="px-3 py-1.5 rounded-3xl border text-base font-medium border-black"
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
