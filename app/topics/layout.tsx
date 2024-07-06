import { ReactNode } from "react";
import { PopularPostsList } from "@/utils/constants";
import Link from "next/link";
import TopicsScroll from "@/components/TopicsScroll";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-10 mt-10 w-full justify-center items-center">
      <TopicsScroll />
      {children}
    </div>
  );
}
