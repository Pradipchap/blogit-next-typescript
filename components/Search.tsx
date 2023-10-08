"use client";
import React from "react";
import searchIcon from "@/public/Icons/search.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Search() {
  const router = useRouter();
  async function handleSearch(formData: FormData) {
    const searchString = formData.get("searchString");
    router.push(`/blogs/search/${searchString}`);
  }

  return (
    <form className="relative" action={handleSearch}>
      <input
        type="search"
        name="searchString"
        id="search"
        className="bg-gray-100 border border-gray-400 peer h-8 outline-none px-1 rounded-md"
      />
      <Image
        src={searchIcon}
        alt="search icon"
        className="absolute top-1/2 -translate-y-1/2 left-1 peer-focus:hidden"
      />{" "}
    </form>
  );
}
