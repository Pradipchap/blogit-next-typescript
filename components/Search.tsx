"use client";

import { useRouter } from "next/navigation";
import Icon from "./Icon";
import PopupOver from "./popups/Popup";
import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "@/custom_hooks/useDebounce";
import useFetchBlog from "@/custom_hooks/useFetchBlog";
import { searchBlogType } from "@/types/dataTypes";
import Link from "next/link";
import Image from "next/image";

export default function Search() {
  const [input, setInput] = useState("");
  const debouncedString = useDebounce(input);
  const router = useRouter();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }
  return (
    <PopupOver
      content={<Content searchString={debouncedString} />}
      targetIndependent={true}
    >
      <div>
        <div className="relative flex items-center rounded-xl px-2 sm:px-3 h-9 w-44 border shadow-sm md:w-56 lg:w-64 bg-white">
          <Icon name="Search" className="text-black/70 px-2 text-base" />
          <input
            type="search"
            name="searchString"
            id="search"
            value={input}
            onChange={handleInputChange}
            className="outline-none h-full w-full text-base text-black/70 placeholder-black/70"
            placeholder="Search"
          />
        </div>
      </div>
    </PopupOver>
  );
}

interface ContentProps {
  searchString: string;
}

function Content({ searchString }: ContentProps) {
  const { data: data, error, loading } = useFetchBlog({
    api: `/api/blogs/search?searchString=${searchString}`,
    dependencies: [searchString],
    method: "GET",
    abort: searchString === "",
  }) as {
    data: { blogs: searchBlogType[]; noOfBlogs: number };
    error: any;
    loading: boolean;
  };

  return (
    <div className="px-2 py-4 flex flex-col gap-2 min-h-52 w-96 bg-white">
      {loading ? (
        <Icon name="Loading" />
      ) : (
        data?.blogs.map(({ _id, title, image, date, description }) => {
          return (
            <Link
              href={`/blogs/${_id}`}
              key={_id}
              className="flex items-center w-full gap-2 py-2 bg-slate-100 hover:bg-slate-50 border transition-all rounded-lg px-2 cursor-pointer"
            >
              <Image
                src={image}
                height={75}
                width={75}
                alt="blog image"
                className="h-full w-14"
              />
              <div className="flex flex-col gap-1">
                <p className="font-bold text-green-900">{title}</p>
                <p className="text-xs font-medium text-gray-400">
                  {description}
                </p>
              </div>
            </Link>
          );
        })
      )}
      {data?.noOfBlogs > 5 && (
        <Link
          href={`/blogs/search/${searchString}`}
          className="h-10 m-auto mt-3 text-green-700 text-sm hover:text-green-600 transition-colors cursor-pointer"
        >
          See more results
        </Link>
      )}
    </div>
  );
}
