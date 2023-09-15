import React from "react";
import ProfleNav from "./ProfileNav";
import Links from "./Links";
import { Navlist } from "../../types/navTypes";
export default function Nav() {
  return (
    <nav className="w-full bg-white h-14 flex justify-between items-center text-black px-5">
      <Links name="Logo" url="/" />
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
