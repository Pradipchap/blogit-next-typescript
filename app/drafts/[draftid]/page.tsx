import { singleBlogProps } from "@/types/createBlogTypes";
import { BASE_URL } from "@/utils/constants";
import Content from "@/app/blogs/[blogid]/Content";
import WriteBlog from "@/components/create/WriteBlog";
import getServerSession from "@/custom_hooks/getServerSession";
type response = {
  blog: singleBlogProps;
};

export default async function Page({
  params,
}: {
  params: { draftid: string };
}) {
  const session = await getServerSession();
  try {
    const response = await fetch(
      `${BASE_URL}/api/drafts/single?draftid=${params.draftid}`
    );
    const data: response = await response.json();
    return (
      <div className="flex flex-col px-3 sm:px-10 md:px-20">
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
