
import PopularPosts from "./PopularPosts";
import PopularTopics from "./PopularTopics";

export default function SideSection() {
  return (
    <div className="flex w-full flex-col gap-10 items-center mt-10">
      <PopularPosts />
      <PopularTopics />
    </div>
  );
}
