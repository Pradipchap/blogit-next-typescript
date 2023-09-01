import React from "react";
import Button from "../Button";

export default function BlogDetailsForm() {
  return (
    <form action="" className="flex flex-col gap-5 w-max bg-black p-10">
      <input
        type="text"
        placeholder="Blog Title "
        className=" text-3xl outline-none text-gray-600 "
        autoFocus
      />
      <input
        type="text"
        placeholder="Blog genre "
        className=" text-3xl outline-none text-gray-600 "
        autoFocus
      />
      <Button name="Publish" operation={() => {}} />
    </form>
  );
}
