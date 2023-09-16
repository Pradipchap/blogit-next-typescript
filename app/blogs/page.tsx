import React from "react";
import BlogCard from "@/components/Home/BlogCard";
import { blogCardProps, singleBlogProps } from "@/types/createBlogTypes";
interface responseType {
  noOfBlogs: number;
  blogs: singleBlogProps[];
}
export default async function page() {
  try {
    const response = await fetch("http://localhost:3000/api/blogs", {
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
