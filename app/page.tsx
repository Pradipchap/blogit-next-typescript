import MainBlogs from "@/components/Home/MainBlogs/MainBlogs";
import SideBlogs from "@/components/Home/SideBlogs/SideBlogs";

export default function Home() {

  return (
    <div className=" flex justify-center mt-5">
      <MainBlogs />
      <SideBlogs />
    </div>
  );
}
