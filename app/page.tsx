import BlogPage from "@/components/Home/Blogpage";
import MainBlogs from "@/components/Home/MainBlogs/MainBlogs";
import SideBlogs from "@/components/Home/SideBlogs/SideBlogs";

export default function Home() {
  return (
    <div className=" flex justify-center">
      <MainBlogs />
      <SideBlogs />
    </div>
  );
}
