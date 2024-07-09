import Image from "next/image";
import Login from "./Logout";
import Icon from "../Icon";
import PopupOver from "../popups/Popup";
import { ProfileNavList } from "@/utils/constants";
import LogoutButton from "../LogoutButton";
import LinkWithIcon from "../LinkwithIcon";
import ProfileImg from "@/public/profile.jpg";
import getServerSession from "@/custom_hooks/getServerSession";

export default async function ProfileNav() {
  const session = await getServerSession();
  if (session) {
    const lists = ProfileNavList.concat([
      { name: "Profile", iconName: "Profile", href: "/profile" },
    ]);
    return (
      <PopupOver
        targetIndependent={true}
        content={
          <div className="flex flex-col bg-white items-start w-max px-10 py-2">
            {lists.map((element) => {
              return (
                <LinkWithIcon
                  key={element.href + JSON.stringify(element.iconName)}
                  iconName={element.iconName}
                  name={element.name}
                  href={element.href}
                  iconClassName="text-black"
                  className="gap-5 hover:opacity-40"
                />
              );
            })}
            <LogoutButton />
          </div>
        }
      >
        <div className="flex relative justify-center items-center gap-1 cursor-pointer">
          <Image
            src={(session?.image as string) || ProfileImg}
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
