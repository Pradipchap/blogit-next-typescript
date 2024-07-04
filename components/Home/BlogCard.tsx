"use client";

import Image from "next/image";
import { blogCardProps } from "@/types/createBlogTypes";
import Link from "next/link";

export default function BlogCard({
  blogid,
  title = "",
  profilename,
  genre,
  profileImage,
  image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&usqp=CAU",
  description = "",
  date,
  link = `/blogs/${blogid}`,
}: blogCardProps) {
  return (
    <div className="w-full max-w-2xl h-52 grid grid-cols-7 gap-5">
      {image !== "" && (
        <Image
          className="h-auto m-auto w-full col-span-2"
          src={image}
          height={100}
          width={100}
          alt="Blog image"
        />
      )}
      <div className="h-full col-span-5 flex flex-col justify-between py-5">
        <div className="flex flex-col gap-2">
          {" "}
          <Link href={link} className="text-base md:text-lg font-bold">
            {title}
          </Link>
          <p className="text-gray-600 text-sm max-w-full line-clamp-3">
            {description.slice(0, 300)}....
          </p>
        </div>
        <div className="flex justify-start items-center font-sans">
          <div className="shrink-0">
            <div>
              <span className="sr-only">{profilename}</span>
              {profileImage && (
                <Image
                  className="h-10 w-10 rounded-full bg-pink-600"
                  src={profileImage}
                  alt="profile image"
                  width={500}
                  height={300}
                />
              )}
            </div>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-skin-inverted">
              <p className="hover:underline">{profilename}</p>
            </div>
            <div className="flex space-x-1 text-xs">
              <p>{new Date(date).toDateString()}</p>
              <span aria-hidden="true">·</span>
              <span>3 min read time</span>
            </div>
          </div>
          {genre && (
            <div className="ml-auto bg-gray-100 text-black text-sm px-3 py-1 rounded-md">
              {genre}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
