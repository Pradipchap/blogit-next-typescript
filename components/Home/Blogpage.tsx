"use client";

import React, { memo, useState } from "react";
import { singleBlogProps } from "@/types/createBlogTypes";
import BlogCardSkeleton from "../skeletons/BlogCardSkeleton";
import useFetchBlog from "@/custom_hooks/useFetchBlog";
import Pagination from "../Pagination";
import { BASE_URL } from "@/utils/constants";
import dynamic from "next/dynamic";

const BlogCard = dynamic(() => import("@/components/Home/BlogCard"), {
  ssr: false,
});
interface responseType {
  noOfBlogs: number;
  blogs: singleBlogProps[];
}

type props = {
  api?: string;
  type?: "blogs" | "drafts";
};
function BlogPage({ api = `${BASE_URL}/api/blogs`, type = "blogs" }: props) {
  const [pageno, setpageno] = useState(1);
  const apiWithPagination = api + `?&pageno=${pageno}`;

  const body = localStorage.getItem("recent");
  const { data: data, error } = useFetchBlog({
    api: apiWithPagination,
    dependencies: [apiWithPagination],
    method: "POST",
    body,
  }) as { data: responseType; error: any; loading: boolean };

  const totalPages = Number(data?.noOfBlogs) / 10;

  if (error) {
    return <p>{error}</p>;
  }
  if (!data) {
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
            profileImage={blog.userid?.image}
            blogid={blog._id}
            date={blog.date}
            profilename={blog.userid.username}
            genre={blog.genre}
            key={blog._id}
            link={type === "drafts" ? `/drafts/${blog._id}` : undefined}
          />
        );
      })}
      {totalPages > 1 && data.blogs.length > 0 && (
        <Pagination
          currentPage={pageno}
          totalPages={totalPages}
          onPageChange={(page) => {
            setpageno(page);
          }}
        />
      )}
    </>
  );
}
export default memo(BlogPage);
