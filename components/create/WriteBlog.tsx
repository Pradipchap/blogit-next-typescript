"use client";
import React, { useEffect, useMemo, useState } from "react";
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
    getContent(content: OutputData, title: string) {
      this.content = content;
      this.formData.title = title;
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
        { title: "", description: "", genre: "", image: null }
      ),
    []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="flex flex-col justify-center items-center gap-10 pt-5">
      <EditorJs submit={editorandform.getContent} isReadOnly={false} />
      {isModalOpen &&
        createPortal(
          <Modal onclose={() => setIsModalOpen(false)}>
            <BlogDetailsForm
              onclose={() => setIsModalOpen(false)}
              title={editorandform.formData.title}
              getFormData={editorandform.getFormData}
              submit={editorandform.returnAll}
            />
          </Modal>,
          document.body
        )}
    </section>
  );
}
