"use client";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/app/reduxhooks";
import { handleIsBlogThumbed, handleThumbClick } from "@/app/actions";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/types/createBlogTypes";

const Icon = dynamic(() => import("./Icon"));
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
  const userId = userid._id;
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [ThumbStatus, setThumbStatus] = useState<
    "liked" | "unliked" | "disabled"
  >("disabled");
  const { accessToken, userID: currentUserId } = useAppSelector(
    (state) => state.session
  );
  const thumbsRef = useRef<HTMLParagraphElement | null>(null);

  const interactions = [
    { name: "Thumb", value: thumbs, clickFunc: incrementThumb },
    { name: "Comment", value: comments, clickFunc: handleCommentClick },
  ];

  function handleCommentClick() {
    setIsCommentOpen(true);
  }

  function incrementThumb() {
    handleThumbClick(blogId, userId);
    if (thumbsRef.current) {
      thumbsRef.current.innerHTML = (thumbs + 1).toString();
    }
  }

  useEffect(
    () => {
      async function isThumbLiked() {
        if (!accessToken) {
          setThumbStatus("disabled");
          return;
        }
        if (userId === currentUserId) {
          setThumbStatus("disabled");
          return;
        }
        const isBlogThumbed = await handleIsBlogThumbed(blogId, userId);

        setThumbStatus(isBlogThumbed ? "liked" : "unliked");
      }
      isThumbLiked();
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [blogId, userId]
  );

  return (
    <div className="py-3 px-8 flex items-center justify-between gap-5 w-full border-y-[0.4px] border-gray-200">
      <SidePopup isOpen={isCommentOpen} onClose={() => setIsCommentOpen(false)}>
        <CommentSection blogId={blogId} />
      </SidePopup>
      <BlogProfile
        profileName={userid.username}
        datetime={date}
        profileImage={userid.image}
      />
      <div className="flex gap-3">
        {interactions.map(({ name, value, clickFunc }) => (
          <div className="flex gap-2 font-light" key={name}>
            <button
              className="group scroll-smooth flex gap-1"
              onClick={clickFunc}
              disabled={name === "Thumb" ? ThumbStatus !== "unliked" : false}
            >
              <Icon
                name={
                  name === "Thumb"
                    ? ThumbStatus === "liked"
                      ? "ThumbSolid"
                      : "Thumb"
                    : name
                }
                className="group-disabled:group-hover:text-gray-600 group-hover:text-black text-gray-600"
              />
              <p
                className={`text-sm group-disabled:group-hover:text-gray-600 group-hover:text-black text-gray-600`}
                {...(name === "Thumb" ? { ref: thumbsRef } : {})}
              >
                {value}
              </p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
