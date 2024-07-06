import Link from "next/link";
import { PopularPostsList as data } from "@/utils/constants";

export default async function PopularTopics() {
  return (
    <div>
      <p className="mb-8 font-medium text-xl">Popular Topics</p>
      <div className="flex items-center flex-wrap gap-2">
        {data.map((item) => {
          return (
            <Link
              href={`/topics/${item}`}
              key={item}
              className="px-3 py-1.5 rounded-3xl border text-base font-medium border-black"
            >
              {item}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
