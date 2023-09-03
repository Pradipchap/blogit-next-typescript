'use client'
import React, { FormEvent, FormEventHandler, RefObject, useRef } from "react";
import Button from "../Button";
import { useSession } from "next-auth/react";

export default function BlogDetailsForm({
  getData,
  submit,
}: {
  getData: (params: object) => void;
  submit: () => void;
}) {
  //   {
  //   returnData,
  // }: {
  //   returnData: (arg: string) => string;
  // }
  const {data:session}=useSession()
  async function returnData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formdata = new FormData(form);
    const data = Object.fromEntries(formdata.entries());
     getData(data);
    const content = submit();
    console.log("all data are", content);
    try {
      const response = await fetch("http://localhost:3000/api/blogs/create", {
        method: "POST",
        body: JSON.stringify({
          userid: session?.user.id,
          title: "title",
          genre: "genre",
          description: "description",
          content: "content",
          image:"image is no",
          popularity:2,

        }),
      }).then(response=>console.log('response',response.json()));

    } catch (error) {
      console.log("error",error)
    }

  }
  return (
    <form
      action=""
      onSubmit={(e) => returnData(e)}
      className="grid grid-cols-2 place-items-center gap-5 w-max bg-white p-10"
    >
      <div></div>
      <div className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Blog Title "
          className="  outline-none px-3 py-2 bg-transparent border-black border  "
          autoFocus
          required
          name="title"
        />
        <input
          type="text"
          placeholder="Blog genre "
          className=" outline-none px-3 py-2 bg-transparent border-black border  "
          autoFocus
          required
          name="genre"
        />
        <textarea
          placeholder="Short Description "
          className="  outline-none px-3 py-2 bg-transparent border-black border  "
          autoFocus
          rows={3}
          minLength={40}
          required
          name="description"
        />
      </div>
      <Button name="Publish" type="submit" operation={() => {}} />
    </form>
  );
}
