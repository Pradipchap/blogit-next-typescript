"use client";
import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";
import BlogDetailsForm from "./BlogDetailsForm";
import { OutputData } from "@editorjs/editorjs";
import Modal from "../Modal/Modal";
import { createPortal } from "react-dom";
const EditorJs = dynamic(() => import("@/components/editorjs/Editor"), {
  ssr: false,
});

export default function WriteBlog() {
  async function create(content: OutputData) {
    // try {
    //   const response = await fetch("http://localhost:3000/api/blogs/create", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       userid: "session?.user.id",
    //       title: "title",
    //       genre: "genre",
    //       description: "description",
    //       content: "content",
    //     }),
    //   });
    // } catch (error) {}
    setfirst(true);
    // console.log("content is",content)
  }
  const [first, setfirst] = useState(false);

  return (
    <section className="flex flex-col justify-center items-center gap-10 py-20">
      <EditorJs submit={create} isReadOnly={false} />
      {first &&
        createPortal(
          <Modal onclose={() => setfirst(false)}>
            <BlogDetailsForm />
          </Modal>,
          document.body,
        )}
    </section>
  );
}
