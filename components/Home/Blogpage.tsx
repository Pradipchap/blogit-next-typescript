"use client";
import React, { memo, useState } from "react";
import BlogCard from "@/components/Home/BlogCard";
import { singleBlogProps } from "@/types/createBlogTypes";
import BlogCardSkeleton from "../skeletons/BlogCardSkeleton";
import useFetchBlog from "@/custom_hooks/useFetchBlog";
import Pagination from "../Pagination";
import { BASE_URL } from "@/utils/constants";
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

  const { data: data, error } = useFetchBlog({
    api: apiWithPagination,
    dependencies: [apiWithPagination],
  }) as { data: responseType; error: any; loading: boolean };

  const totalPages = Math.ceil(Number(data?.noOfBlogs) / 10);

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
            profileImage={blog.userid.image}
            blogid={blog._id}
            date={blog.date}
            profilename={blog.userid.username}
            genre={blog.genre}
            key={blog._id}
            link={type === "drafts" ? `/drafts/${blog._id}` : undefined}
          />
        );
      })}
      {Number(data.noOfBlogs) > totalPages && (
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
