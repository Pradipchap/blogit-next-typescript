"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

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
        className="border border-gray-400 peer h-8 outline-none px-1 rounded-md"
      />
      <Icon
        name="Search"
        className="text-black absolute top-1/2 -translate-y-1/2 left-2 peer-focus:hidden"
      />{" "}
    </form>
  );
}
