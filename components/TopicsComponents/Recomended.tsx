"use client";

import React, { useState } from "react";
import RecomendedBlogCard from "./RecomendedBlogCard";
import { BASE_URL } from "@/utils/constants";
import { responseType } from "@/types/dataTypes";
import useFetchBlog from "@/custom_hooks/useFetchBlog";
import Pagination from "../Pagination";

export default function Recomended({ topic }: { topic: string }) {
  const [page, setPage] = useState(1);
  const { data: data, error } = useFetchBlog({
    api: `${BASE_URL}/api/blogs?pageno=${page}`,
    dependencies: [page],
    method: "POST",
    body: JSON.stringify({}),
  }) as { data: responseType; error: any; loading: boolean };
  const totalPages = Number(data?.noOfBlogs) / 10;
  if (error) {
    return <p></p>;
  }

  return (
    <div className="flex flex-col gap-10 w-full">
      <h1 className="text-xl font-light my-10">
        Recomended blogs related to{" "}
        <span className="font-bold text-3xl px-3"> {topic.toUpperCase()}</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {data?.blogs.map((blog) => (
          <RecomendedBlogCard
            title={blog.title}
            description={blog.description}
            image={blog.image}
            profileImage={blog.userid?.image}
            blogid={blog._id}
            date={blog.date}
            profilename={blog.userid.username}
            genre={blog.genre}
            key={blog._id}
          />
        ))}
      </div>
      {totalPages > 1 && data.blogs.length > 0 && (
        <Pagination
          onPageChange={(x) => setPage(x)}
          currentPage={page}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
