import Image from "next/image";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Login from "./Logout";
import Icon from "../Icon";
import PopupOver from "../popups/Popup";
import { ProfileNavList } from "@/types/navTypes";
import Links from "./Links";
export default async function ProfileNav() {
  const session = await getServerSession(authOptions);
  if (session)
    return (
      <PopupOver
        content={
          <div className="flex flex-col items-start w-max px-5 py-2 gap-2">
            {ProfileNavList.map((element) => {
              return (
                <Links
                  key={element.url + JSON.stringify(element.iconName)}
                  name={element.name}
                  url={element.url}
                  iconName={element.iconName}
                  containerClassName="hover:bg-slate-300/30 w-full justify-start px-4 py-2 rounded-md"
                  className="text-black"
                  iconClassName="text-black"
                />
              );
            })}
          </div>
        }
      >
        <div className="flex relative justify-center items-center gap-1 cursor-pointer">
          <Image
            src={session?.user.image as string}
            alt="profile"
            width={30}
            height={30}
            className="rounded-full"
          />
          <button>
            <Icon className="text-black" name="Down" />
          </button>
        </div>
      </PopupOver>
    );
  else {
    return <Login />;
  }
}
