import React from "react";

interface props {
  name: string;
  type?: "submit" | "button";
  operation: () => void;
}
export default function Button({ name, type = "button", operation }: props) {
  return (
    <button
      type={type}
      className="px-3 py-1 text-lg w-max h-max bg-white border-black border text-black rounded-sm text-center hover:bg-black hover:text-white"
      onClick={operation}
    >
      {name}
    </button>
  );
}
