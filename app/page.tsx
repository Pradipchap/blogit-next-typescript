import SideSection from "@/components/Home/SideSection/SideSection";
import dynamic from "next/dynamic";
const MainBlogs = dynamic(
  () => import("@/components/Home/MainBlogs/MainBlogs"),
  { ssr: false }
);

export const maxDuration = 60;

function Page() {
  return (
    <div className="h-max flex justify-center w-full mt-5 min-h-[calc(100vh-76px)] px-2 md:px-10 avg:px-16 gap-5">
      <div className="flex-1 h-full">
        <MainBlogs />
      </div>
      <div className="sideblog flex-1 w-[30%] flex-grow-0 sticky top-[76px] h-max hidden avg:block">
        <SideSection />
      </div>
    </div>
  );
}
export default Page;
