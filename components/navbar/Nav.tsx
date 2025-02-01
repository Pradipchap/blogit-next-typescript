"use client";

import { ReactNode, memo } from "react";
import Links from "./Links";
import { Navlist } from "@/utils/constants";
import Search from "../Search";
import Logo from "@/public/Satya Saramsha.png";
import Image from "next/image";
import Link from "next/link";

const Nav = memo(function x({ children }: { children: ReactNode }) {
  return (
    <div className="h-14 ">
      <nav
        className={`w-full z-20 fixed top-0 text-black
       h-14 bg-white flex justify-between items-center px-3 xl:px-10`}
      >
        <Link href="/">
          <Image
            src={Logo}
            width={70}
            height={70}
            className="mt-1"
            alt="logo"
            loading="lazy"
          />
        </Link>

        {/* <Link
          href="/summarize"
          className="text-black text-lg px-4 py-2 rounded-lg border-2 border-purple-500 transition-all hover:font-bold hover:text-white hover:bg-gradient-to-r from-purple-700 to-purple-500 hover:shadow-lg hover:shadow-purple-500/80"
        >
          Summarize your news
        </Link> */}

        <Link
          href="/fakeOrNot"
          className="text-black text-lg px-4 py-2 rounded-lg border-2 border-purple-500 transition-all hover:font-bold hover:text-white hover:bg-gradient-to-r from-purple-700 to-purple-500 hover:shadow-lg hover:shadow-purple-500/80"
        >
          Fake News Detector
        </Link>

        <div className="flex gap-3 lg:gap-6 items-center">
          <div className={`gap-6 sm:flex sm:flex-row hidden items-center`}>
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
});
export default Nav;
