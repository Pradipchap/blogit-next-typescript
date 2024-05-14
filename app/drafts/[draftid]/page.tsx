import { singleBlogProps } from "@/types/createBlogTypes";
import { BASE_URL } from "@/utils/constants";
import React from "react";
import Content from "@/app/blogs/[blogid]/Content";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/NextAuthOptions";
import WriteBlog from "@/components/create/WriteBlog";
type response = {
  blog: singleBlogProps;
};

export default async function Page({
  params,
}: {
  params: { draftid: string };
}) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${BASE_URL}/api/drafts/single?draftid=${params.draftid}`,
    );
    const data: response = await response.json();
    console.log(data.blog.title);
    return (
      <div className="flex flex-col px-3 sm:px-10 md:px-20">
        {data.blog.userid._id === session?.user.id ? (
          <WriteBlog data={data.blog.content} title={data.blog.title} />
        ) : (
          <Content
            data={data.blog.content}
            title={data.blog.title}
            image={data.blog.image}
          />
        )}
      </div>
    );
  } catch (error) {
    return <h1>error while getting blog</h1>;
  }
}
