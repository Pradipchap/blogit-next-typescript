"use client";
import React from "react";
import Image from "next/image";
import arrowdown from "@/public/Icons/arrowdown.svg";
import Links from "./Links";
import { ProfileNavList } from "@/types/navTypes";
import { useState } from "react";
import { signOut } from "next-auth/react";
export default function OpenMenu() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  return (
    <div onClick={() => setIsMenuOpened((isMenuOpened) => !isMenuOpened)}>
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
                <button type="button" onClick={() => signOut()}>
                  Logout
                </button>
                <hr className="bg-gray-100 h-[1px] w-full" />
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
