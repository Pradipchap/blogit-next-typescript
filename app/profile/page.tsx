
const ProfileSection = dynamic(
  () => import("../../components/profileComponents/ProfileSection"),
  { ssr: false }
);
import Image from "next/image";
const Blogs = dynamic(() => import("@/components/profileComponents/Blogs"), {
  ssr: false,
});
import getServerSession from "@/custom_hooks/getServerSession";
import dynamic from "next/dynamic";
export const maxDuration = 60;

async function Page() {
  const session = await getServerSession();
  return (
    <div className="flex flex-col justify-center items-center">
      <div className={`profileSection w-full`}>
        <ProfileSection>
          {session ? (
            <>
              <Image
                src={session?.image || ""}
                className="rounded-full h-32 w-32"
                alt="profile image"
                height={128}
                width={128}
              />
              <p className="text-xl font-medium">{session?.username}</p>
              <p className="text-base text-gray-500 font-light">
                {session?.email}
              </p>
            </>
          ) : (
            <p></p>
          )}
        </ProfileSection>
      </div>
      <div className="w-[60%] max-w-2xl flex-col flex items-center h-[60rem]">
        <Blogs />
      </div>
    </div>
  );
}
export default Page;
