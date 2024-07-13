"use client";

import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { singleBlogProps } from "@/types/createBlogTypes";
import useFetchBlog from "@/custom_hooks/useFetchBlog";
import { BASE_URL } from "@/utils/constants";
const Pagination = dynamic(() => import("../Pagination"));
const BlogCardSkeleton = dynamic(() => import("../skeletons/BlogCardSkeleton"));
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
  method?: "GET" | "POST";
};
function BlogPage({
  api = `${BASE_URL}/api/blogs`,
  type = "blogs",
  method = "GET",
}: props) {
  const [pageno, setpageno] = useState(1);
  const apiWithPagination = api + `?&pageno=${pageno}`;

  const body = localStorage.getItem("recent");
  const { data: data, error, loading } = useFetchBlog({
    api: apiWithPagination,
    dependencies: [apiWithPagination],
    method,
    body,
  }) as { data: responseType; error: any; loading: boolean };

  const totalPages = Number(data?.noOfBlogs) / 10;

  if (error) {
    return <p>{error}</p>;
  }
  if (loading) {
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
  if (data?.noOfBlogs === 0) {
    return <p>No results</p>;
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
            _id={blog._id}
            date={blog.date}
            profilename={blog.userid?.username}
            genre={blog.genre}
            key={blog._id}
            thumbs={blog.thumbs}
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
