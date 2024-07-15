import Image from "next/image";
interface props {
  profileImage?: string;
  profileName: string;
  datetime: string;
  genre?: string;
}
import { profileImage as FallBackProfile } from "@/utils/constants";

export default function BlogProfile({
  profileImage,
  genre,
  datetime,
  profileName,
}: props) {
  return (
    <div className="flex justify-start items-center font-sans">
      <div className="shrink-0">
        <div>
          <Image
            className="h-5 w-5 md:h-7 md:w-7 rounded-full bg-pink-600"
            src={profileImage || FallBackProfile}
            alt="profile image"
            width={30}
            height={30}
          />
        </div>
      </div>
      <div className="ml-3">
        {profileName && (
          <div className="text-sm font-medium text-skin-inverted">
            <p className="hover:underline text-gray-900">{profileName}</p>
          </div>
        )}
        <div className="flex space-x-1 text-xs text-[#6b6b6b]">
          <p>{new Date(datetime).toDateString()}</p>
          <span aria-hidden="true">·</span>
          {genre && <span>{Math.floor(Math.random() * 5)} min read time</span>}
        </div>
      </div>
      {genre && (
        <div className="ml-auto bg-gray-100 text-black text-sm px-3 py-1 rounded-md">
          {genre}
        </div>
      )}
    </div>
  );
}
