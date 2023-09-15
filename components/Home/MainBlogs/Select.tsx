"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
type Props = {
  options: string[];
  setOption: (params: string) => void;
};
export default function Select({ options, setOption }: Props) {
  return (
    <div className="flex gap-2 mx-5 ">
      {options.map((element) => {
        return (
          <React.Fragment key={element}>
            <Option name={element} setOption={setOption} />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function Option({
  name,
  setOption,
}: {
  name: string;
  setOption: (params: string) => void;
}) {
  const [first, setfirst] = useState()
  const searchparams = useSearchParams().get("feed");

  useEffect(() => {
    if (searchparams === name) {

    }
  }, [searchparams]);
  return (
    <div className="flex flex-col">
      <button onClick={() => setOption(name)} className="">
        {name}{" "}
      </button>
      <hr className="w-full  bg-black h-0.5" />
    </div>
  );
}
