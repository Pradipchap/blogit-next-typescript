import React from "react";

export default function HamMenu({ operation }: { operation: () => void }) {
  return (
    <div
      onClick={operation}
      className="  sm:hidden flex flex-col justify-center bg-white items-center gap-1"
    >
      <ul className="w-5 h-0.5 bg-black "></ul>
      <ul className="w-5 h-0.5 bg-black "></ul>
      <ul className="w-5 h-0.5 bg-black "></ul>
    </div>
  );
}
