"use client";
import dynamic from "next/dynamic";
import useFetchBlog from "@/custom_hooks/useFetchBlog";
import { commentInterface } from "@/types/createBlogTypes";
import { BASE_URL } from "@/utils/constants";
import { useState } from "react";
const BlogProfile = dynamic(() => import("./BlogProfile"));
const WriteComment = dynamic(() => import("./WriteComment"));
import { useAppSelector } from "@/app/reduxhooks";

interface props {
  blogId: string;
}

export default function CommentSection({ blogId }: props) {
  const sessionUserId = useAppSelector((state) => state.session.userID);
  const [writtenComments, setWrittenComments] = useState<commentInterface[]>(
    []
  );
  const { data, error } = useFetchBlog({
    api: `${BASE_URL}/api/comments?blogId=${blogId}`,
    dependencies: [],
    method: "GET",
  });

  if (data === null || error) {
    return <p></p>;
  }

  const { comments } = data as { comments: commentInterface[] };
  function pushComment(cmt: commentInterface) {
    setWrittenComments((cmts) => [cmt, ...cmts]);
  }
  return (
    <>
      {typeof sessionUserId !== "undefined" && (
        <WriteComment blogId={blogId} pushComment={pushComment} />
      )}

      {[...writtenComments, ...comments]?.map((comment) => {
        return (
          <div
            className="flex flex-col gap-3 min-w-32 px-3 pt-8"
            key={comment._id}
          >
            <BlogProfile
              profileName={comment.userid.username}
              date={comment.datetime}
              profileImage={comment.userid.image}
            />
            <p className="text-sm font-light">{comment.comment}</p>
            {/* <hr className="w-full h-[0.1px] bg-gray-400" /> */}
          </div>
        );
      })}
            {[...writtenComments, ...comments]?.map((comment) => {
        return (
          <div
            className="flex flex-col gap-3 min-w-32 px-3 pt-8"
            key={comment._id}
          >
            <BlogProfile
              profileName={comment.userid.username}
              date={comment.datetime}
              profileImage={comment.userid.image}
            />
            <p className="text-sm font-light">{comment.comment}</p>
            {/* <hr className="w-full h-[0.1px] bg-gray-400" /> */}
          </div>
        );
      })}
    </>
  );
}
