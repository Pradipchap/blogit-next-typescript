"use client";

import Image from "next/image";
import { blogCardProps } from "@/types/createBlogTypes";
import Link from "next/link";
import { blogImage } from "@/utils/constants";

export default function BlogCard({
  _id,
  title = "",
  profilename,
  genre,
  profileImage,
  image = blogImage,
  description = "",
  date,
  link = `/blogs/${_id}`,
}: blogCardProps) {
  return (
    <div className="w-full max-w-2xl h-56 grid grid-cols-7 gap-5">
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
          <Link href={link} className="text-base md:text-2xl font-bold">
            {title}
          </Link>
          <p className="text-gray-600 text-sm md:text-base max-w-full line-clamp-2">
            {description}
          </p>
        </div>
        <div className="flex justify-start items-center font-sans">
          <div className="shrink-0">
            <div>
              {profileImage && (
                <Image
                  className="h-5 w-5 md:h-7 md:w-7 rounded-full bg-pink-600"
                  src={profileImage}
                  alt="profile image"
                  width={30}
                  height={30}
                />
              )}
            </div>
          </div>
          <div className="ml-3">
            {profilename && (
              <div className="text-sm font-medium text-skin-inverted">
                <p className="hover:underline">{profilename}</p>
              </div>
            )}
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
