"use client";
import React, { useState } from "react";
import { TNavItems } from "../../types/navTypes";
import Link from "next/link";
import HamMenu from "./HamMenu";
import ProfleNav from "./ProfileNav";
import Links from "./Links";
import { Navlist } from "../../types/navTypes";
export default function Nav() {
  function openSmallMenu() {
    // setIsmenuClicked(true);
  }
  //   const [ismenuClicked, setIsmenuClicked] = useState(false);
  return (
    <nav className="w-full bg-white h-14 flex justify-between items-center text-black px-5">
      <p>Logo</p>
      <div className="flex gap-10 ">
        {Navlist.map((element) => {
          return (
            <Links
              name={element.name}
              url={element.url}
              key={element.name}
              svg={element.svg}
            />
          );
        })}
        <ProfleNav />
      </div>
    </nav>
  );
}
