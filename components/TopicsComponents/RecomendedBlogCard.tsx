import { blogCardProps } from "@/types/createBlogTypes";
import { blogImage } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Icon from "../Icon";

export default function RecomendedBlogCard({
  blogid,
  title = "",
  profilename,
  genre,
  profileImage,
  image = blogImage,
  description = "",
  thumbs = 0,
  comments = 0,
  date,
  link = `/blogs/${blogid}`,
}: blogCardProps) {
  return (
    <div className="w-full max-w-[35rem] h-[33rem] flex flex-col p-1 gap-2">
      {image !== "" && (
        <Image
          className="h-72 w-full object-cover"
          src={image}
          height={100}
          width={100}
          alt="Blog image"
        />
      )}
      <div className="flex items-center mt-4 w-full gap-3 mb-2">
        {profileImage && (
          <Image
            className="h-6 w-6 rounded-full"
            src={profileImage}
            alt="profile image"
            width={500}
            height={300}
          />
        )}
        <span className="text-sm">{profilename}</span>
        <span className="mx-auto mr-0 text-[#31302f] px-4 py-1 bg-slate-200 rounded-full text-sm">
          {genre}
        </span>
      </div>
      <Link href={link} className="text-2xl font-bold">
        {title}
      </Link>
      <p className="text-base text-[#4a4949] font-normal line-clamp-2">
        {description}
      </p>
      <div className="flex space-x-1 text-xs mt-1 items-center text-[#6B6B6B] gap-2">
        <p>{new Date(date).toDateString()}</p>
        <span>3 min</span>
        <span className="flex gap-1 items-center h-full justify-center">
          <Icon name="Thumb" className="text-xl mb-1 text-[#6B6B6B] " />
          <p className="font-medium text-[#6B6B6B]">{thumbs}</p>
        </span>
        <span className="flex gap-1 items-center h-full  justify-center">
          <Icon name="Comment" className="text-xl mb-1 text-[#6B6B6B] " />
          <p className="font-medium text-[#6B6B6B]">{comments}</p>
        </span>
      </div>
    </div>
  );
}
