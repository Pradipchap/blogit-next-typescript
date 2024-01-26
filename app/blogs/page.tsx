import React from "react";
import BlogCard from "@/components/Home/BlogCard";
import { singleBlogProps } from "@/types/createBlogTypes";
import { BASE_URL } from "@/utils/constants";
interface responseType {
  noOfBlogs: number;
  blogs: singleBlogProps[];
}
export default async function page() {
  try {
    const response = await fetch(`${BASE_URL}/api/blogs`, {
      cache: "no-cache",
    });
    const data: responseType = await response.json();
    return (
      <div>
        {data.blogs.map((blog) => {
          return (
            <BlogCard
              key={blog._id}
              title={blog.title}
              profileImage={blog.userid.image}
              profilename={blog.userid.username}
              date={blog.date}
              description={blog.description}
              blogid={blog._id}
              genre={blog.genre}
              image={blog.image}
            />
          );
        })}
      </div>
    );
  } catch (error) {
    return <h1>{error as string}</h1>;
  }
}
