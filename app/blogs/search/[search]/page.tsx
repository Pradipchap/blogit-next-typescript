import BlogCard from "@/components/Home/BlogCard";
import { responseType } from "@/types/dataTypes";
import { BASE_URL } from "@/utils/constants";
import React from "react";

export default async function Page({ params }: { params: { search: string } }) {
  console.log("search params", params.search);
  try {
    const response = await fetch(
      `${BASE_URL}/api/blogs/search?searchString=${params.search}`,
      { cache: "no-cache" }
    );
    const data: responseType = await response.json();
    console.log(await data.blogs);
    return (
      <div className="flex flex-col gap-5">
        {data.blogs.map((blog) => {
          return (
            <BlogCard
              title={blog.title}
              description={blog.description}
              image={blog.image}
              profileImage={blog.userid.image}
              blogid={blog._id}
              date={blog.date}
              profilename={blog.userid.username}
              genre={blog.genre}
              key={blog._id}
            />
          );
        })}
      </div>
    );
  } catch (error) {
    return <p>sorry</p>;
  }
}
