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
      className="px-3 py-2 text-xl w-max h-max bg-red-600 rounded-md text-center text-white"
      onClick={operation}
    >
      {name}
    </button>
  );
}
