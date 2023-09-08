"use client";
import React, { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import BlogDetailsForm from "./BlogDetailsForm";
import { OutputData } from "@editorjs/editorjs";
import { detailsForm } from "@/types/createBlogTypes";
import Modal from "../popups/Modal";
import { createPortal } from "react-dom";

const EditorJs = dynamic(() => import("@/components/editorjs/Editor"), {
  ssr: false,
});

export default function WriteBlog() {
  class output {
    content: OutputData;
    formData: detailsForm;
    constructor(content: OutputData, formData: detailsForm) {
      this.content = content;
      this.formData = formData;
      this.getContent = this.getContent.bind(this);
      this.getFormData = this.getFormData.bind(this);
      this.returnAll = this.returnAll.bind(this);
    }
    getContent(content: OutputData) {
      this.content = content;
      try {
        setIsModalOpen(true);
      } catch (error) {
        console.log(error);
      }
    }
    getFormData(formData: detailsForm) {
      this.formData = formData;
    }
    returnAll(): { content: OutputData; formData: detailsForm } {
      return { content: this.content, formData: this.formData };
    }
  }
  const editorandform = useMemo(
    () =>
      new output(
        { blocks: [] },
        { title: "", description: "", genre: "", image: null },
      ),
    [],
  );

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
    // console.log("content is",content)
  }

  const formRef = useRef<HTMLFormElement>(null!);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function getData(params: string) {}
  return (
    <section className="flex flex-col justify-center items-center gap-10 py-20">
      <EditorJs submit={editorandform.getContent} isReadOnly={false} />
      {isModalOpen &&
        createPortal(
          <Modal onclose={() => setIsModalOpen(false)}>
            <BlogDetailsForm
              getFormData={editorandform.getFormData}
              submit={editorandform.returnAll}
            />
          </Modal>,
          document.body,
        )}
    </section>
  );
}
