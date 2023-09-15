import React, { memo, useMemo } from "react";
import BlogCard from "@/components/Home/BlogCard";
import { singleBlogProps } from "@/types/createBlogTypes";
interface responseType {
  noOfBlogs: number;
  blogs: singleBlogProps[];
}
type props = {
  api?: string;
};
async function BlogPage({ api = "http://localhost:3000/api/blogs" }: props) {
  try {
    const response = await fetch(api, { cache: "no-cache" });
    const data: responseType = await response.json();

    console.log(api)
    return (
      <div>
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
    return <h1>{JSON.stringify(error)}</h1>;
  }
}
export default memo(BlogPage);
