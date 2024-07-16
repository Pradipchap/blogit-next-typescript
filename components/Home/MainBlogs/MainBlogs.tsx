"use client";

import { useSearchParams } from "next/navigation";
import { TabsInterface } from "@/types/componentTypes";
import { BASE_URL } from "@/utils/constants";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Select = dynamic(() => import("./Select"), { ssr: false });
const BlogPage = dynamic(() => import("../Blogpage"), { ssr: false });

const options: TabsInterface[] = [
  { key: "popular", label: "Most Popular" },
  { key: "feeds", label: "Feeds" },
];

export default function MainBlogs() {
  const router = useRouter();
  const params = useSearchParams();
  const feedQuery = params.get("option") || "feeds";
  function onSelectionChange(tab: TabsInterface) {
    const selectedOption =
      options.find((item) => {
        return item.key === tab.key.toString();
      }) || options[0];
    router.push(`?option=${selectedOption.key}`);
  }

  return (
    <div className="relative h-full w-full flex flex-col items-center">
      {" "}
      <Select
        options={options}
        currentOption={feedQuery}
        onSelectionChange={onSelectionChange}
      />
      <div className="m-auto w-full items-center flex flex-col ">
        <BlogPage
          api={`${BASE_URL}/api/blogs?option=${feedQuery}`}
          method="POST"
        />
      </div>{" "}
    </div>
  );
}
