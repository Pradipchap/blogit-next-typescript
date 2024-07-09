import SideSection from "@/components/Home/SideSection/SideSection";
import dynamic from "next/dynamic";
const MainBlogs = dynamic(
  () => import("@/components/Home/MainBlogs/MainBlogs"),
  { ssr: false }
);

export const maxDuration = 60;

function Page() {
  return (
    <div className="h-max flex justify-center w-full mt-5 min-h-[calc(100vh-76px)] px-2 md:px-20">
      <div className="w-[70%] h-full">
        <MainBlogs />
      </div>
      <div className="sideblog w-[30%] sticky top-[76px] h-max hidden md:block">
        <SideSection />
      </div>
    </div>
  );
}
export default Page;
