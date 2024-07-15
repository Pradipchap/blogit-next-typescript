"use client";

import Image from "next/image";
import { blogCardProps } from "@/types/createBlogTypes";
import Link from "next/link";
import { blogImage } from "@/utils/constants";
import BlogProfile from "../BlogViewComponents/BlogProfile";

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
        <BlogProfile
          profileImage={profileImage}
          profileName={profilename || ""}
          datetime={date}
          genre={genre}
        />
      </div>
    </div>
  );
}
