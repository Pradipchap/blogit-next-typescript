"use client";
import React from "react";
import Links from "./Links";
import { Navlist } from "@/utils/constants";
import Search from "../Search";

export default function Nav({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-14 ">
      <nav
        className={`w-full z-20 fixed top-0 text-black
       h-14 bg-white flex justify-between items-center px-5`}
      >
        <Links name="Logo" href="/" />
        <div className="flex gap-3 lg:gap-6">
          <div className={`gap-6 sm:flex sm:flex-row hidden`}>
            {Navlist.map((element) => {
              return (
                <Links
                  name={element.name}
                  href={element.href}
                  key={element.href + JSON.stringify(element?.iconName)}
                  iconName={element.iconName}
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
