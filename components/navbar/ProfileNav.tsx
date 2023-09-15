import Image from "next/image";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OpenMenu from "./OpenMenu";
import Login from "./Logout";
export default async function ProfleNav() {
  const session = await getServerSession(authOptions);

  if (session)
    return (
      <div className="flex relative justify-center items-center gap-1 cursor-pointer">
        <Image
          src={session?.user.image as string}
          alt="profile"
          width={30}
          height={30}
          className="rounded-full"
        />
        <OpenMenu />
      </div>
    );
  else {
    return <Login />;
  }
}
