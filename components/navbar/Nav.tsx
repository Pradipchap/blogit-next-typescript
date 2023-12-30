"use client";
import React from "react";
import Links from "./Links";
import { Navlist } from "../../types/navTypes";
import Search from "../Search";

export default function Nav({ children }: { children: React.ReactNode }) {
  return (
   <div className="h-14">
     <nav
      className={`w-full fixed top-0 text-black
       h-14 bg-red-500 flex justify-between items-center px-5`}
    >
      <Links name="Logo" url="/" />
      <div className="flex gap-3 lg:gap-6">
        <div className={`gap-6 sm:flex sm:flex-row hidden`}>
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
        </div>
        <Search />
        {children}
      </div>
    </nav>
   </div>
  );
}
