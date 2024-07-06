"use client";

import dynamic from "next/dynamic";
import { PopularPostsList } from "@/utils/constants";
import { useRef } from "react";
import useIntersection from "@/custom_hooks/useIntersection";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Icon = dynamic(() => import("./Icon"));

export default function TopicsScroll() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const leftScroll = useRef<HTMLAnchorElement | null>(null);
  const rightScroll = useRef<HTMLAnchorElement | null>(null);
  const leftButton = useRef<HTMLButtonElement | null>(null);
  const rightButton = useRef<HTMLButtonElement | null>(null);
  const params = usePathname();
  const topic = params.split("/")[2];

  useIntersection({
    watcher: leftScroll,
    buttonRef: leftButton,
  });
  useIntersection({
    watcher: rightScroll,
    buttonRef: rightButton,
  });

  function rightScrollhandler() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy(150, 0);
    }
  }
  function leftScrollHandler() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy(-150, 0);
    }
  }
  return (
    <div
      ref={scrollContainerRef}
      className="relative flex items-center h-10 gap-2 w-[90%] scroll-smooth overflow-y-clip md:w-[80%] lg:w-[70%] overflow-x-auto no-scrollbar"
    >
      {" "}
      <button
        ref={leftButton}
        onClick={leftScrollHandler}
        className="sticky flex items-center left-0 py-0 bg-gradient-to-l to-white via-white/70 backdrop-blur-[0.2px] from-white/30"
      >
        <Icon name="Left" />
        <div className="h-10 w-10" />
      </button>
      {PopularPostsList.map((item, index) => {
        return (
          <Link
            ref={
              index == 0
                ? leftScroll
                : index === PopularPostsList.length - 1
                ? rightScroll
                : null
            }
            className={`py-2 text-center px-4 rounded-3xl text-[15px] font-normal text-gray-900 bg-gray-100 ${
              topic === item ? "border border-gray-500" : ""
            }`}
            href={`/topics/${item}`}
            key={item}
          >
            {item}
          </Link>
        );
      })}
      <button
        ref={rightButton}
        onClick={rightScrollhandler}
        className="sticky flex items-center right-0 py-0 bg-gradient-to-r to-white via-white/70 backdrop-blur-[0.2px] from-white/30"
      >
        <div className="h-full w-10" />
        <Icon name="Right" />
      </button>
    </div>
  );
}
