"use client";
import React, { memo, useEffect, useMemo, useState } from "react";
import BlogCard from "@/components/Home/BlogCard";
import { singleBlogProps } from "@/types/createBlogTypes";
interface responseType {
  noOfBlogs: number;
  blogs: singleBlogProps[];
}
type props = {
  api?: string;
};
function BlogPage({ api = "http://localhost:3000/api/blogs" }: props) {
  const [data, setData] = useState<responseType | undefined>();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(api, { cache: "no-cache" });
      const data: responseType = await response.json();
      await setData(data);
    };
    getData();
  }, [api]);

  return (
    <div>
      {typeof data !== "undefined" ? (
        data.blogs.map((blog) => {
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
        })
      ) : (
        <p>sorry something wrong occured</p>
      )}
    </div>
  );
}
export default memo(BlogPage);
