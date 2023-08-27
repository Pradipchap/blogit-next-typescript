import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

import { TNavItems } from "@/types/navTypes";
export default function Links({
  name,
  url,
  operation = () => {},
  svg,
}: TNavItems) {
  if (typeof svg === "undefined")
    return (
      <Link href={url} onClick={operation}>
        {name}
      </Link>
    );
  else
    return (
      <Link
        href={url}
        onClick={operation}
        className="flex justify-center items-center gap-2"
      >
        <Image src={svg} alt={name} />
        <p>{name}</p>
      </Link>
    );
}
