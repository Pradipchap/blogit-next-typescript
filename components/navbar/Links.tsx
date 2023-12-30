import Image from "next/image";
import Link from "next/link";
import React from "react";

import { TNavItems } from "@/types/navTypes";
export default function Links({ name, url, svg }: TNavItems) {
  if (typeof svg === "undefined") return <Link href={url}>{name}</Link>;
  else
    return (
      <Link href={url} className="flex justify-center items-center gap-2">
        <Image src={svg} alt={name} className="text-white" />
        <p>{name}</p>
      </Link>
    );
}
