"use client";
import { useAppSelector } from "@/app/reduxhooks";
import classNames from "@/utils/classNames";
import { profileImage } from "@/utils/constants";
import Image from "next/image";
import React from "react";

interface props {
  className?: string;
  imageClassName?: string;
}

export default function CurrentProfile({ className, imageClassName }: props) {
  const { image, username } = useAppSelector((state) => state.session);
  return (
    <div
      className={classNames(
        "flex items-center w-max gap-2 text-sm font-medium",
        className
      )}
    >
      <Image
        src={image || profileImage}
        alt="profile image"
        width={32}
        height={32}
        className={classNames("w-9 h-9 rounded-full", imageClassName)}
      />
      <p>{username}</p>
    </div>
  );
}
