"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import arrowdown from "@/public/Icons/arrowdown.svg";
import { ProfileNavList } from "@/types/navTypes";
import { SessionProviderProps } from "next-auth/react";
import { getProviders } from "next-auth/react";
import Links from "./Links";
import { signIn, useSession } from "next-auth/react";
export default function ProfleNav() {
  const [providers, setproviders] = useState<any>();
  useEffect(() => {
    const setupProviders = async () => {
      const prov = await getProviders();
      if (prov) setproviders(prov);
    };
  }, []);

  const { data: session } = useSession();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  function openMenu() {
    session ? setIsMenuOpened((isMenuOpened) => !isMenuOpened) : signIn();
  }
  if (session)
    return (
      <div
        onClick={openMenu}
        className="flex relative justify-center items-center gap-1 cursor-pointer"
      >
        <Image
          src={session?.user.image as string}
          alt="profile"
          width={30}
          height={30}
          className="rounded-full"
        />

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
  else {
    return (
      <button type="button" onClick={openMenu}>
        Login
      </button>
    );
  }
}
