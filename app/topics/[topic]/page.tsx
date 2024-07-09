import dynamic from "next/dynamic";
const Recomended = dynamic(() =>
  import("@/components/TopicsComponents/Recomended")
);
export const maxDuration = 60;

export default function Page({ params }: { params: { topic: string } }) {
  console.log(params.topic);
  return (
    <div className="w-full px-5 sm:px-10 md:px-20 ">
      <Recomended topic={params.topic} />
    </div>
  );
}
