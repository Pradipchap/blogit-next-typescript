import { singleBlogProps } from "@/types/createBlogTypes";
import { BASE_URL } from "@/utils/constants";
import React from "react";
import Content from "@/app/blogs/[blogid]/Content";
import authOptions from "@/utils/NextAuthOptions";
import WriteBlog from "@/components/create/WriteBlog";
import getServerSession from "@/custom_hooks/getServerSession";
import SetLocalStorage from "./setLocalStorage";
import IncreaseViews from "./IncreaseViews";

type response = {
  blog: singleBlogProps;
};

export default async function Page({ params }: { params: { blogid: string } }) {
  const session = await getServerSession();
  try {
    const response = await fetch(
      `${BASE_URL}/api/blogs/single?blogid=${params.blogid}`
    );
    const data: response = await response.json();
    //console.log(data.blog.title);
    const { title, description, genre } = await data.blog;
    return (
      <div className="flex flex-col px-3 sm:px-10 md:px-20">
        <IncreaseViews blogid={data.blog._id} />
        <SetLocalStorage
          title={title}
          description={description}
          genre={genre}
        />
        {data.blog.userid._id === session?.userID ? (
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
