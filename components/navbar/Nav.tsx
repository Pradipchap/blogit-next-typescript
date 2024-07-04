"use client";

import { ReactNode } from "react";
import Links from "./Links";
import { Navlist } from "@/utils/constants";
import Search from "../Search";
import Logo from "@/public/logo-no-background.svg";
import Image from "next/image";
import Link from "next/link";

export default function Nav({ children }: { children: ReactNode }) {
  return (
    <div className="h-14 ">
      <nav
        className={`w-full z-20 fixed top-0 text-black
       h-14 bg-white flex justify-between items-center px-3 xl:px-10`}
      >
        <Link href="/">
          <Image src={Logo} width={70} height={70} alt="logo" loading="lazy" />
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
}
