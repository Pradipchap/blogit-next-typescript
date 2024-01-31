import React from "react";
import ProfileSection from "./ProfileSection";
import Image from "next/image";
import { getServerSession } from "next-auth";
import Blogpage from "@/components/Home/Blogpage";
import Blogs from "./Blogs";
export default async function Page() {
  const session =await getServerSession();
  return (
    <div className="flex flex-col justify-center items-center">
      <div className={`profileSection w-full`}>
        <ProfileSection>
          <>
            <Image
              src={session?.user.image || ""}
              className="rounded-full h-32 w-32"
              alt="profile image"
              height={100}
              width={100}
            />
            <p className="text-xl font-medium">{session?.user.name}</p>
            <p className="text-base text-gray-500 font-light">
              {session?.user.email}
            </p>
          </>
        </ProfileSection>
      </div>
      <div className="w-[60%] max-w-2xl flex-col flex items-center h-[60rem]">
        {/* <Blogpage/> */}
        <Blogs/>
      </div>
    </div>
  );
}

/* <Blogpage api={`${BASE_URL}/api/blogs/myblogs`} / */
