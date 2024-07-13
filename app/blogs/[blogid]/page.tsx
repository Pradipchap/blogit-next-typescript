import { singleBlogProps } from "@/types/createBlogTypes";
import { BASE_URL } from "@/utils/constants";
import { CookieInterface } from "@/types/dataTypes";
import dynamic from "next/dynamic";
const Content = dynamic(() => import("@/app/blogs/[blogid]/Content"));
const WriteBlog = dynamic(() => import("@/components/create/WriteBlog"));
import getServerSession from "@/custom_hooks/getServerSession";
const ThumbsUp = dynamic(() => import("@/components/ThumbsUp"), { ssr: false });
const SetLocalStorage = dynamic(() => import("./setLocalStorage"), {
  ssr: false,
});
const IncreaseViews = dynamic(() => import("./IncreaseViews"));

type response = {
  blog: singleBlogProps;
};

export default async function Page({ params }: { params: { blogid: string } }) {
  const session: CookieInterface = await getServerSession();
  try {
    const response = await fetch(
      `${BASE_URL}/api/blogs/single?blogid=${params.blogid}`
    );
    if (!response.ok) {
      throw "";
    }
    const data: response = await response.json();
    const {
      title,
      description,
      genre,
      image,
      userid,
      content,
      _id,
      thumbs,
      comments,
    } = await data.blog;
    return (
      <div className="flex flex-col px-3 sm:px-10 md:px-20 items-center justify-center m-auto mt-24 max-w-4xl">
        <IncreaseViews blogid={_id} />
        <SetLocalStorage
          title={title}
          description={description}
          genre={genre}
        />
        {userid._id === session?.userID ? (
            <WriteBlog
              data={content}
              title={title}
              image={image}
              genre={genre}
              description={description}
              blogId={_id}
            >
              <ThumbsUp
                blogId={_id}
                thumbs={thumbs}
                comments={comments}
                userid={userid}
                date={data.blog.date}
              />
            </WriteBlog>
        ) : (
          <>
            <h1 className="text-xl md:text-2xl xl:text-4xl font-bold mb-10">
              {title}
            </h1>
            <ThumbsUp
              blogId={_id}
              thumbs={thumbs}
              comments={comments}
              userid={userid}
              date={data.blog.date}
            />
            <Content {...data.blog} />
          </>
        )}
      </div>
    );
  } catch (error) {
    return <h1>error while getting blog</h1>;
  }
}
