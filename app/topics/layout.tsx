import dynamic from "next/dynamic";
import { ReactNode } from "react";
const TopicsScroll = dynamic(() => import("@/components/TopicsScroll"));
export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-10 mt-10 w-full justify-center items-center">
      <TopicsScroll />
      {children}
    </div>
  );
}
