"use client";
import React, { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import { OutputData } from "@editorjs/editorjs";

interface EditorProps {
  isReadOnly?: boolean;
  data?: OutputData;
  submit?: (content: OutputData, title: string) => void;
  editorInstance: React.MutableRefObject<EditorJS | undefined>;
}

export default function EditorJs({
  isReadOnly = false,
  data,
  editorInstance,
}: EditorProps) {
  const initializeEditor = () => {
    const editor = new EditorJS({
      holder: "editor",
      onReady: () => {
        //console.log("Editor js is ready");
        editorInstance.current = editor;
      },
      onChange: async (api, event) => {
        //console.log("editor is changed", event);
        if (editorInstance.current) {
          if (isReadOnly) {
            return;
          }

          const content = await editorInstance.current?.save();
          sessionStorage.setItem("editorContent", JSON.stringify(content));
        }
      },
      autofocus: false,
      readOnly: isReadOnly,
      data: data
        ? data
        : JSON.parse(
            sessionStorage.getItem("editorContent") ||
              JSON.stringify({ blocks: [] })
          ),
      placeholder: data ? "Blog Body" : false,
      tools: {},
    });
    editorInstance.current = editor;
  };

  useEffect(
    () => {
      //console.log("editor js compoentnt");
      if (!editorInstance.current) {
        initializeEditor();
      }

      return () => {
        if (editorInstance.current && editorInstance.current.destroy) {
          editorInstance.current.destroy();
        }
      };
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return <div id="editor" className="w-full" />;
}
