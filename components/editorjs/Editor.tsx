"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { OutputData } from "@editorjs/editorjs";
import Button from "../Button";
import CreateActionButtons from "../create/CreateActionButtons";

interface EditorProps {
  isReadOnly?: boolean;
  data?: OutputData | undefined;
  submit?: (content: OutputData, title: string) => void;
}

export default function EditorJs({
  isReadOnly = false,
  data = { blocks: [] },
  submit,
}: EditorProps) {
  const editorInstance = useRef<EditorJS>();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const initializeEditor = () => {
    const editor = new EditorJS({
      holder: "editor",
      onReady: () => {
        console.log("Editor js is ready");
        editorInstance.current = editor;
      },
      onChange: async (api, event) => {
        console.log("editor is changed", event);
        if (editorInstance.current) {
          const content = await editorInstance.current?.save();
          sessionStorage.setItem("editorContent", JSON.stringify(content));
        }
      },
      autofocus: false,
      readOnly: isReadOnly,
      data: isReadOnly
        ? data
        : JSON.parse(
            sessionStorage.getItem("editorContent") ||
              JSON.stringify({ blocks: [] })
          ),
      placeholder: isReadOnly ? false : "Blog Body",
    });
    editorInstance.current = editor;
  };

  useEffect(() => {
    console.log("editor js compoentnt");
    if (!editorInstance.current) {
      initializeEditor();
    }

    return () => {
      if (editorInstance.current && editorInstance.current.destroy) {
        editorInstance.current.destroy();
      }
    };
  }, []);
  const contentSave = async () => {
    if (editorInstance.current && titleRef.current) {
      const content = await editorInstance.current?.save();
      // console.log("first");
      typeof submit !== "undefined" && submit(content, titleRef.current.value);
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-20 relative py-20">
      {!isReadOnly && (
        <>
          <div className="self-center flex items-center justify-center gap-4">
            {" "}
            <label
              className="self-start text-4xl text-gray-400"
              htmlFor="title"
            >
              Title :-
            </label>
            <input
              id="title"
              ref={titleRef}
              type="text"
              className=" self-start text-3xl outline-none"
              autoFocus
              placeholder="Write your Blog title"
            />
          </div>
          <div className="absolute right-0 top-0 flex justify-center items-center gap-5">
            <CreateActionButtons />
            <Button
              type="submit"
              onClick={contentSave}
              className="bg-green-600 text-sm text-white border-none py-2 px-3 hover:bg-green-500"
            >
              Publish
            </Button>
          </div>
        </>
      )}
      {/* <h1 className="text-gray-500 text-3xl">Start writing your blog ....</h1> */}
      <div id="editor" className="w-full" />
    </div>
  );
}
