"use client";

import dynamic from "next/dynamic";
import  { useState } from "react";
const RecomendedBlogCard = dynamic(() => import("./RecomendedBlogCard"));
import { BASE_URL } from "@/utils/constants";
import { responseType } from "@/types/dataTypes";
import useFetchBlog from "@/custom_hooks/useFetchBlog";
import TopicBlogSkeleton from "../skeletons/TopicBlogSkeleton";
const Pagination = dynamic(() => import("../Pagination"));

export default function Recomended({ topic }: { topic: string }) {
  const [page, setPage] = useState(1);
  const { data: data, error, loading } = useFetchBlog({
    api: `${BASE_URL}/api/blogs/topic?pageno=${page}&topic=${topic.toLowerCase()}`,
    dependencies: [page],
    method: "GET",
  }) as { data: responseType; error: any; loading: boolean };
  const totalPages = Number(data?.noOfBlogs) / 10;
  if (error) {
    return <p></p>;
  }

  return (
    <div className="flex flex-col gap-10 w-full items-center">
      <h1 className="text-xl font-light my-10">
        Recomended blogs related to{" "}
        <span className="font-bold text-3xl px-1"> {topic}</span>
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 self-start">
        {loading ? (
          <>
            <TopicBlogSkeleton />
            <TopicBlogSkeleton />
          </>
        ) : (
          data?.blogs.map((blog) => (
            <RecomendedBlogCard
              title={blog.title}
              description={blog.description}
              image={blog.image}
              profileImage={blog.userid?.image}
              _id={blog._id}
              date={blog.date}
              profilename={blog.userid?.username}
              genre={blog.genre}
              key={blog._id}
            />
          ))
        )}
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
