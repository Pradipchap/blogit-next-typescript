import MainBlogs from "@/components/Home/MainBlogs/MainBlogs";
import SideBlogs from "@/components/Home/SideBlogs/SideBlogs";

export default function Home() {
  return (
    <>
      <div className="h-max flex justify-center mt-5 min-h-[calc(100vh-76px)] px-2 md:px-5">
        <div className="w-[70vw] h-full ">
          <MainBlogs />
        </div>
        <div className="border-l border-gray-200 sideblog w-[30vw] sticky top-[76px] h-[60rem] hidden md:block">
          <SideBlogs />
        </div>
      </div>
    </>
  );
}
