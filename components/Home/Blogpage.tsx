"use client";
import React, { Fragment, memo, useEffect, useMemo, useState } from "react";
import BlogCard from "@/components/Home/BlogCard";
import { singleBlogProps } from "@/types/createBlogTypes";
import BlogCardSkeleton from "../skeletons/BlogCardSkeleton";
interface responseType {
  noOfBlogs: number;
  blogs: singleBlogProps[];
}
type props = {
  api?: string;
};
function BlogPage({ api = "http://localhost:3000/api/blogs" }: props) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<responseType | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(api, { cache: "no-cache" });
        const data: responseType = await response.json();
        await setData(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [api]);

  if (error) {
    return <p>something wrong happended</p>;
  }
  if (isLoading) {
    return (
      <>
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </>
    );
  }
  return (
    <>
      {data?.blogs.map((blog) => {
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
    </>
  );
}
export default memo(BlogPage);
