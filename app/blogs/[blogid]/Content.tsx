"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
import EditorJSType, { OutputData } from "@editorjs/editorjs";
const EditorJs = dynamic(() => import("@/components/editorjs/Editor"));
import Image from "next/image";
import { singleBlogProps } from "@/types/createBlogTypes";

export default function Content({
  content,
  image,
}: {
  content: OutputData;
  image: string;
}) {
  const editorInstance = useRef<EditorJSType>();
  return (
    <div className="flex flex-col mt-16 gap-10 justify-center items-center">
      {image && (
        <Image
          src={image}
          loading="lazy"
          alt="Blog image"
          className="h-96"
          objectFit="cover"
          height={200}
          width={700}
        />
      )}
      <EditorJs isReadOnly data={content} editorInstance={editorInstance} />
    </div>
  );
}
