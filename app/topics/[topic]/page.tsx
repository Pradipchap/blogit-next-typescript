import Others from "@/components/TopicsComponents/Others";
import Recomended from "@/components/TopicsComponents/Recomended";
import React from "react";

export default function page({ params }: { params: { topic: string } }) {
  return (
    <div className="w-full px-5 sm:px-10  md:px-20 ">
      <Recomended topic={params.topic} />
    </div>
  );
}
