"use client";
import Image from "next/image";
import React, { useState } from "react";
import arrowdown from "@/public/Icons/arrowdown.svg";
import { ProfileNavList } from "@/types/navTypes";
import Links from "./Links";
import { useSession } from "next-auth/react";
export default function ProfleNav() {
  const { data: session } = useSession();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  function openMenu() {
    setIsMenuOpened((isMenuOpened) => !isMenuOpened);
  }
  return (
    <div
      onClick={openMenu}
      className="flex relative justify-center items-center gap-1 cursor-pointer"
    >
      <p className="h-8 w-8 rounded-full " />
      {/* <Image src={session?.user.image} alt="profile" /> */}
      <Image src={arrowdown} alt="arrow" width={13} />
      {isMenuOpened && (
        <div className="absolute top-10 right-[10%] bg-white border-gray-300 border shadow-sm shadow-white flex flex-col items-start w-max pl-5 pr-10 py-5 gap-2 ">
          {ProfileNavList.map((element) => {
            return (
              <React.Fragment key={element.name}>
                <Links
                  name={element.name}
                  url={element.url}
                  operation={element.operation}
                  svg={element.svg}
                />
                <hr className="bg-gray-100 h-[1px] w-full" />
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
