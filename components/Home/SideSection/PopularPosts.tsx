import { responseType } from "@/types/dataTypes";
import { BASE_URL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

export default async function PopularPosts() {
  const response = await fetch(`${BASE_URL}/api/blogs/popularblogs`, {
    cache: "no-cache",
  });
  if (!response.ok) {
    return <p>sorry something went wrong</p>;
  }
  const data: responseType = await response.json();
  //console.log(data.blogs);
  return (
    <div>
      <p className="mb-8 font-medium text-xl">Popular Posts</p>
      {data.blogs.map((item) => {
        return (
          <Fragment key={item._id}>
            <Post
              userimage={item.userid.image}
              username={item.userid.username}
              _id={item._id}
              title={item.title}
              description={item.description}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

interface PostProps {
  title: string;
  description: string;
  _id: string;
  username: string;
  userimage: string;
}
function Post({ title, description, _id, userimage, username }: PostProps) {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <div className=" flex gap-2 items-center">
        {userimage && (
          <Image
            src={userimage}
            alt="profile image"
            height={20}
            width={20}
            className="rounded-full"
          />
        )}
        <p className="text-xs font-semibold">{username}</p>
      </div>
      <Link href={`blogs/${_id}`} className="font-bold">
        {title}
      </Link>
      <p className=" text-sm font-normal line-clamp-3">
        {description.slice(0, 140)}
      </p>
    </div>
  );
}
