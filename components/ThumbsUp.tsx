"use client";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/app/reduxhooks";
import { handleThumbClick } from "@/app/actions";
const Icon = dynamic(() => import("./Icon"));
import { useRef, useState } from "react";
import { profile } from "@/types/createBlogTypes";
const BlogProfile = dynamic(() => import("./BlogViewComponents/BlogProfile"));
const CommentSection = dynamic(() =>
  import("./BlogViewComponents/CommentSection")
);
const SidePopup = dynamic(() => import("./popups/SidePopup"));

interface props {
  blogId: string;
  thumbs?: number;
  comments?: number;
  userid: profile;
  date: string;
}

export default function ThumbsUp({
  blogId,
  thumbs = 0,
  comments = 0,
  userid,
  date,
}: props) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const session = useAppSelector((state) => state.session);
  const thumbsRef = useRef<HTMLParagraphElement | null>(null);
  const interactions = [
    { name: "Thumb", value: thumbs, clickFunc: incrementThumb },
    {
      name: "Comment",
      value: comments,
      clickFunc: handleCommentClick,
    },
  ];

  function handleCommentClick() {
    console.log("first");
    setIsCommentOpen(true);
  }
  function incrementThumb() {
    console.log("first");
    handleThumbClick(blogId);
    if (thumbsRef.current) {
      thumbsRef.current.innerHTML = (thumbs + 1).toString();
    }
  }

  return (
    <div className="py-3 px-8 flex items-center justify-between gap-5 w-full border-y border-gray-200">
      <SidePopup isOpen={isCommentOpen} onClose={() => setIsCommentOpen(false)}>
        <CommentSection blogId={blogId} />
      </SidePopup>
      <BlogProfile
        profileName={userid.username}
        date={date}
        profileImage={userid.image}
      />
      <div className="flex gap-3">
        {interactions.map(({ name, value, clickFunc }) => {
          return (
            <div className="flex gap-2 text-gray-500 font-light" key={name}>
              <button
                className=" scroll-smooth"
                onClick={clickFunc}
                disabled={
                  name === "Thumb"
                    ? session.accessToken
                      ? userid._id === session.userID
                        ? true
                        : false
                      : true
                    : false
                }
              >
                <Icon
                  name={name}
                  className="hover:text-green-700 hover:scale-110 transition-colors text-gray-500"
                />
              </button>{" "}
              <p
                className="text-sm"
                {...(name === "Thumb" ? { ref: thumbsRef } : {})}
              >
                {0}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
