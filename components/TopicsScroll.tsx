"use client";

import { PopularPostsList } from "@/utils/constants";
import Link from "next/link";
import React, { useRef } from "react";
import Button from "./Button";
import useIntersection from "@/custom_hooks/useIntersection";
import Icon from "./Icon";

export default function TopicsScroll() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const leftScroll = useRef<HTMLAnchorElement | null>(null);
  const rightScroll = useRef<HTMLAnchorElement | null>(null);
  const leftButton = useRef<HTMLButtonElement | null>(null);
  const rightButton = useRef<HTMLButtonElement | null>(null);
  const isLeftInterSecting = useIntersection({
    watcher: leftScroll,
    buttonRef: leftButton,
  });
  const isRightInterSecting = useIntersection({
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
      className="relative flex gap-2 w-[90%] scroll-smooth overflow-y-clip md:w-[80%] lg:w-[70%] overflow-x-auto no-scrollbar"
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
            href={`/topics/${item}`}
            key={item}
            className="px-3 py-1.5 rounded-3xl border text-base font-medium border-black"
          >
            {item}
          </Link>
        );
      })}
      {/* <Button
        ref={rightButton}
        onClick={rightScrollhandler}
        icon="Right"
        className="sticky right-0 py-0 bg-gradient-to-l from-white via-white/70 backdrop-blur-[0.2px] to-white/30"
        iconAlignment="right"
        iconClassName="opacity-60"
      >
        <div className="h-full w-10" />
      </Button> */}
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
