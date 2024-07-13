"use client";
import { useEffect } from "react";
import EditorJS, { ToolConstructable } from "@editorjs/editorjs";
import { OutputData } from "@editorjs/editorjs";
import CodeTool from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import ImageTool from "@editorjs/image";
import { BASE_URL } from "@/utils/constants";
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
        editorInstance.current = editor;
      },
      onChange: async (api, event) => {
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
      tools: {
        code: CodeTool,
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+M",
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+W",
          config: {
            titlePlaceholder: "Title",
            messagePlaceholder: "Message",
          },
        },
        marker: Marker,
        table: Table,
        image: {
          class: (ImageTool as unknown) as ToolConstructable,
          config: {
            /**
             * Custom uploader
             */
            uploader: {
              /**
               * Upload file to the server and return an uploaded image data
               * @param {File} file - file selected from the device or pasted by drag-n-drop
               * @return {Promise.<{success, file: {url}}>}
               */
              async uploadByFile(file: File) {
                console.log(file);
                const formData = new FormData();
                formData.append("image", file);
                const response = await fetch(`${BASE_URL}/api/editorImage`, {
                  method: "POST",
                  body: formData,
                });
                const { image } = await response.json();
                return {
                  success: 1,
                  file: {
                    url: image,
                  },
                };
              },

              // uploadByUrl(url){
              //   // your ajax request for uploading
              //   return MyAjax.upload(file).then(() => {
              //     return {
              //       success: 1,
              //       file: {
              //         url: 'https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg',,
              //         // any other image data you want to store, such as width, height, color, extension, etc
              //       }
              //     }
              //   })
              // }
            },
          },
        },
      },
    });
    editorInstance.current = editor;
  };

  useEffect(
    () => {
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

  return <div id="editor" className="w-full max-w-full px-2" />;
}
