"use client";

import { OutputData } from "@editorjs/editorjs";
import React, { useRef } from "react";
import EditorJSType from "@editorjs/editorjs";
const EditorJs = dynamic(() => import("@/components/editorjs/Editor"));
import Image from "next/image";
import dynamic from "next/dynamic";

interface props {
  data: OutputData;
  title: string;
  image?: string;
}

export default function Content({ data, title, image }: props) {
  const editorInstance = useRef<EditorJSType>();
  return (
    <div className="flex flex-col mt-16 gap-5 justify-center items-center w-full">
      <h1 className="text-xl font-bold">{title}</h1>
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
      <EditorJs isReadOnly data={data} editorInstance={editorInstance} />
    </div>
  );
}
