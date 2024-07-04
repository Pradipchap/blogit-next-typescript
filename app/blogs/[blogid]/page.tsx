import { singleBlogProps } from "@/types/createBlogTypes";
import { BASE_URL } from "@/utils/constants";
import Content from "@/app/blogs/[blogid]/Content";
import WriteBlog from "@/components/create/WriteBlog";
import getServerSession from "@/custom_hooks/getServerSession";
import dynamic from "next/dynamic";
import { CookieInterface } from "@/types/dataTypes";
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
    if(!response.ok){
      throw ""
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
    } = await data.blog;
    return (
      <div className="flex flex-col px-3 sm:px-10 md:px-20">
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
          />
        ) : (
          <Content data={content} title={title} image={image} />
        )}
      </div>
    );
  } catch (error) {
    console.log(error)
    return <h1>error while getting blog</h1>;
  }
}
