import Link from "next/link";
import { PopularPostsList as data } from "@/utils/constants";

export default async function PopularTopics() {
  return (
    <div>
      <p className="mb-8 font-bold text-lg text-green-700">Popular Topics</p>
      <div className="flex items-center flex-wrap gap-3">
        {data.slice(0, 10).map((item) => {
          return (
            <Link
              href={`/topics/${item}`}
              key={item}
              className="px-3 py-1.5 rounded-3xl border text-[15px] font-medium bg-gray-100"
            >
              {item}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
