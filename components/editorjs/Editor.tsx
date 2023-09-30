"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { OutputData } from "@editorjs/editorjs";
import Button from "../Button";

interface EditorProps {
  isReadOnly?: boolean;
  data?: OutputData | undefined;
  submit?: (content: OutputData) => void;
}

export default function EditorJs({
  isReadOnly = false,
  data = { blocks: [] },
  submit,
}: EditorProps) {
  const editorInstance = useRef<EditorJS>();
  const initializeEditor = () => {
    const editor = new EditorJS({
      holder: "editor",
      onReady: () => {
        console.log("Editor js is ready");
        editorInstance.current = editor;
      },
      onChange: (api, event) => {
        console.log("editor is changed", event);
      },
      autofocus: false,

      readOnly: isReadOnly,
      data: isReadOnly ? data : undefined,
      placeholder: isReadOnly ? false : "write something",
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
    if (editorInstance.current) {
      const content = await editorInstance.current?.save();
      console.log(content);
      // console.log("first");
      typeof submit !== "undefined" && submit(content);
    }
    // console.log("second");
  };

  return (
    <div className="flex flex-col items-center w-full gap-20">
      {/* <h1 className="text-gray-500 text-3xl">Start writing your blog ....</h1> */}
      <div id="editor" className="w-full" />
      {!isReadOnly && <Button name="Publish" operation={contentSave} />}
    </div>
  );
}
