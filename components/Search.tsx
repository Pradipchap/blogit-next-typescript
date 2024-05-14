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
      className="relative flex items-center rounded-lg px-2 sm:px-3 shadow-[0px_5px_15px_1px_#e2e8f0] h-10 w-44 md:w-56 lg:w-64 bg-white"
    >
      {/* <Icon name="Search" className="text-black  px-2 " /> */}
      <input
        type="search"
        name="searchString"
        id="search"
        className="outline-none h-full w-full"
        placeholder="Search"
      />
    </form>
  );
}
