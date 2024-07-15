"use client";
import dynamic from "next/dynamic";
import useFetchBlog from "@/custom_hooks/useFetchBlog";
import { commentInterface } from "@/types/createBlogTypes";
import { BASE_URL } from "@/utils/constants";
import { useState } from "react";
import BlogProfile from "./BlogProfile";
const WriteComment = dynamic(() => import("./WriteComment"));
import { useAppSelector } from "@/app/reduxhooks";
import CommentSkeleton from "../skeletons/CommentSkeleton";

interface props {
  blogId: string;
}

export default function CommentSection({ blogId }: props) {
  const sessionUserId = useAppSelector((state) => state.session.userID);
  const [writtenComments, setWrittenComments] = useState<commentInterface[]>(
    []
  );
  const { data, error, loading } = useFetchBlog({
    api: `${BASE_URL}/api/comments?blogId=${blogId}`,
    dependencies: [],
    method: "GET",
  }) as {
    data: { comments: commentInterface[] };
    error: any;
    loading: boolean;
  };
  if (error) {
    return <p></p>;
  }

  const comments = data?.comments || [];
  function pushComment(cmt: commentInterface) {
    setWrittenComments((cmts) => [cmt, ...cmts]);
  }
  return (
    <>
      {typeof sessionUserId !== "undefined" && (
        <WriteComment blogId={blogId} pushComment={pushComment} />
      )}

      {!loading ? (
        [...writtenComments, ...comments]?.map((comment) => {
          return (
            <div
              className="flex flex-col gap-3 min-w-32 px-3 pt-8"
              key={comment._id}
            >
              <BlogProfile
                profileName={comment.userid.username}
                datetime={comment.datetime}
                profileImage={comment.userid.image}
              />
              <p className="text-sm font-light">{comment.comment}</p>
              {/* <hr className="w-full h-[0.1px] bg-gray-400" /> */}
            </div>
          );
        })
      ) : (
        <>
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
        </>
      )}
    </>
  );
}
