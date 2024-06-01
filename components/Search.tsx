"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

export default function Search() {
  const router = useRouter();
  async function handleSearch(formData: FormData) {
    const searchString = formData.get("searchString");
    router.push(`blogs/search/${searchString}`);
  }

  return (
    <form
      action={handleSearch}
      className="relative flex items-center rounded-xl px-2 sm:px-3 h-9 w-44 border shadow-sm brder-black/70 md:w-56 lg:w-64 bg-white"
    >
      <Icon name="Search" className="text-black/70 px-2 text-base" />
      <input
        type="search"
        name="searchString"
        id="search"
        className="outline-none h-full w-full text-base text-black/70 placeholder-black/70"
        placeholder="Search"
      />
    </form>
  );
}
