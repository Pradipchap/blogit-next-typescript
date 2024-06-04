"use client";
import React, { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import EditorJSType from "@editorjs/editorjs";
import BlogDetailsForm from "./BlogDetailsForm";
import { OutputData } from "@editorjs/editorjs";
import { detailsForm } from "@/types/createBlogTypes";
import Modal from "../popups/Modal";
import { createPortal } from "react-dom";
import Button from "../Button";
import CreateActionButtons from "./CreateActionButtons";

const EditorJs = dynamic(() => import("@/components/editorjs/Editor"), {
  ssr: false,
});

interface props {
  data?: OutputData;
  title?: string;
}

export default function WriteBlog({ data, title }: props) {
  const editorInstance = useRef<EditorJSType>();
  const titleRef = useRef<HTMLInputElement | null>(null);
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

    async saveEditorContent() {
      let title = "";
      let content: OutputData = { blocks: [] };
      if (editorInstance.current && titleRef.current) {
        title = titleRef.current.value;
        content = await editorInstance.current?.save();
        editorandform.content = content;
        editorandform.formData.title = title;
      }
      return { content, title };
    }

    async getContent() {
      //console.log("data time", data?.time);
      const { content, title } = await editorandform.saveEditorContent();
      this.content = content;
      this.formData.title = title;
      try {
        setIsModalOpen(true);
      } catch (error) {
        //console.log(error);
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="relative flex flex-col justify-center items-center gap-10 pt-5">
      <div className="absolute right-0 top-5 flex justify-center items-center gap-5">
        <CreateActionButtons editorSave={editorandform.saveEditorContent} />
        <Button
          type="submit"
          // disabled={JSON.parse(
          //   sessionStorage.getItem("editorContent") ||
          //     JSON.stringify({ blocks: [] })
          // ).time===data?.time}
          onClick={editorandform.getContent}
          className="bg-green-600 text-sm disabled:bg-green-300 disabled:hover:bg-green-300 text-white border-none py-2 px-3 hover:bg-green-500"
        >
          Publish
        </Button>
      </div>
      <div className="flex flex-col items-center w-full gap-20 relative mt-10">
        <div className="self-center flex items-center justify-center gap-4">
          {" "}
          <label className="self-start text-4xl text-gray-400" htmlFor="title">
            Title :-
          </label>
          <input
            id="title"
            ref={titleRef}
            defaultValue={title}
            type="text"
            className=" self-start text-3xl outline-none"
            autoFocus
            placeholder="Write your Blog title"
          />
        </div>
        <EditorJs
          submit={editorandform.getContent}
          isReadOnly={false}
          data={data}
          editorInstance={editorInstance}
        />
      </div>
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
