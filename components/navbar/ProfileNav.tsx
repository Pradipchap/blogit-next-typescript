import Image from "next/image";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Login from "./Logout";
import Icon from "../Icon";
import PopupOver from "../popups/Popup";
import { ProfileNavList } from "@/types/navTypes";
import LogoutButton from "../LogoutButton";
import LinkWithIcon from "../LinkwithIcon";

export default async function ProfileNav() {
  const session = await getServerSession(authOptions);
  if (session) {
    const lists=ProfileNavList.concat([{name:"Profile",iconName:"Profile",href:"/profile"}])
    return (
      <PopupOver
        content={
          <div className="flex flex-col items-start w-max px-5 py-2">
            {lists.map((element) => {
              return (
                <LinkWithIcon
                  key={element.href + JSON.stringify(element.iconName)}
                  iconName={element.iconName}
                  name={element.name}
                  href={element.href}
                  iconClassName="text-black"
                />
              );
            })}
            <LogoutButton />
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
            <Icon className="text-black text-sm" name="Down" />
          </button>
        </div>
      </PopupOver>
    );
  } else {
    return <Login />;
  }
}
