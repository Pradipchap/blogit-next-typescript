import React, { ChangeEvent, useState } from "react";
import Button from "../Button";
import { handleCommentPost } from "@/app/actions";
import CurrentProfile from "../profileComponents/CurrentProfile";
import { useAppSelector } from "@/app/reduxhooks";
import { SUBMIT_STATUS } from "@/utils/constants";
import { commentInterface } from "@/types/createBlogTypes";

interface props {
  blogId: string;
  pushComment: (cmt: commentInterface) => void;
}

export default function WriteComment({ blogId, pushComment }: props) {
  const [postStatus, setPostStatus] = useState(SUBMIT_STATUS.INACTIVE);
  const session = useAppSelector((state) => state.session);
  const [comment, setComment] = useState("");
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }

  async function sendComment() {
    setPostStatus(SUBMIT_STATUS.PROCESSING);
    const response = await handleCommentPost(blogId, comment, session.userID);
    if (response) {
      setPostStatus(SUBMIT_STATUS.SUCCESS);
      pushComment({
        comment: comment,
        _id: crypto.randomUUID(),
        datetime: new Date().toUTCString(),
        userid: {
          username: session.username,
          image: session.image,
          _id: session.userID,
          email: session.email,
        },
      });
    } else {
      setPostStatus(SUBMIT_STATUS.FAILED);
    }
  }
  return (
    <div className="w-full h-max border bg-white  px-2 py-5 mb-3 flex flex-col gap-8 shadow-sm">
      <CurrentProfile />
      <form>
        <textarea
          placeholder="What are your thoughts"
          rows={2}
          value={comment}
          onChange={handleChange}
          className="placeholder:font-light appearance-none outline-none w-full"
        />
        <div className="w-full flex gap-5 items-center justify-end">
          <Button
            className="mt-5 hover:text-gray-600 transition-colors text-sm"
            type="button"
            onClick={() => setComment("")}
          >
            Cancel
          </Button>
          <Button
            status={postStatus}
            onClick={sendComment}
            type="button"
            disabled={comment === ""}
            className="bg-green-600 disabled:opacity-60 hover:bg-green-700 transition-colors text-white mt-5 text-sm"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
