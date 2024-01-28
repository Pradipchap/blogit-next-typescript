import EditorJs from "@/components/editorjs/Editor";
import { singleBlogProps } from "@/types/createBlogTypes";
import { BASE_URL } from "@/utils/constants";
import React from "react";
type response = {
  blog: singleBlogProps;
};

export default async function page({ params }: { params: { blogid: string } }) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/blogs/single?blogid=${params.blogid}`,
      { cache: "no-cache" },
    );
    const data: response = await response.json();
    return (
      <div>
        <EditorJs isReadOnly data={data.blog.content} />
      </div>
    );
  } catch (error) {
    return <h1>dsa</h1>;
  }
}
