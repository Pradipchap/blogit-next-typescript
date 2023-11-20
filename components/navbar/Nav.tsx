'use client'

import React, { useState } from "react";
import Links from "./Links";
import { Navlist } from "../../types/navTypes";
import Search from "../Search";
import Image from "next/image";
import closeIcon from "@/public/Icons/close.svg"
import menuIcon from "@/public/Icons/menu.svg"

export default function Nav({children}:{children:React.ReactNode}) {
  const [IsMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <nav className={`w-full ${IsMenuOpen?"fixed z-20 flex-col top-0 left-0 min-h-screen h-full justify-start":"h-14 flex-row"} sm:h-14 sm:flex-row sm:min-h-max bg-red-500 flex sm:justify-between sm:items-center text-black px-5`}>
      <Links name="Logo" url="/" />
      <div className={`gap-10 sm:flex sm:flex-row ${IsMenuOpen?"flex flex-col ":"hidden"}`}>
      <Search />
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
        {children}
        <Image src={IsMenuOpen?closeIcon:menuIcon} alt="menu" className="block sm:hidden" onClick={()=>setIsMenuOpen(!IsMenuOpen)}/>
        </div>

    </nav>
  );
}
