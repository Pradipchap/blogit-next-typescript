import React from "react";
import SamirImage from "@/public/img01.png";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen w-full">
      <div className="h-[30rem] w-[25rem] overlay">
        {/* <div className="ray" /> */}
        {/* <Image src={SamirImage} alt="samir img" className="image" /> */}
        <div className="mydiv"></div>
      </div>
    </div>
  );
}
