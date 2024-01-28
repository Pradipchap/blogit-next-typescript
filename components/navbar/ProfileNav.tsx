import Image from "next/image";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Login from "./Logout";
import Icon from "../Icon";
import PopupOver from "../popups/Popup";
import { ProfileNavList } from "@/types/navTypes";
import Button from "../Button";
import { signOut } from "next-auth/react";
import LogoutButton from "../LogoutButton";
export default async function ProfileNav() {
  const session = await getServerSession(authOptions);
  if (session)
    return (
      <PopupOver
        content={
          <div className="flex flex-col items-start w-max px-5 py-2">
            {ProfileNavList.map((element) => {
              return (
                <Button
                  key={element.url + JSON.stringify(element.iconName)}
                  icon={element.iconName}
                  className="text-black text-base gap-2 hover:scale-105 border-b"
                  iconClassName="text-black"
                >
                  {element.name}
                </Button>
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
  else {
    return <Login />;
  }
}
