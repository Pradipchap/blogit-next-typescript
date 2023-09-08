"use client";
import React, { FormEvent } from "react";
import Button from "../Button";
import { useSession } from "next-auth/react";
import { OutputData } from "@editorjs/editorjs";
import { detailsForm } from "@/types/createBlogTypes";

import { useRouter } from "next/navigation";

import ImageUpload from "./ImageUpload";

export default function BlogDetailsForm({
  getFormData,
  submit,
}: {
  getFormData: (formData: detailsForm) => void;
  submit: () => { content: OutputData; formData: detailsForm };
}) {
  const router = useRouter();
  //   {
  //   returnData,
  // }: {
  //   returnData: (arg: string) => string;
  // }
  const { data: session } = useSession();
  async function returnData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    const formdataInstnce = new FormData(form);
    const formdata = Object.fromEntries(
      formdataInstnce.entries(),
    ) as detailsForm;
    console.log("formdata", formdata);

    getFormData(formdata);
    const content = submit();
    console.log("formadata", content.formData);

    const data = new FormData();
    data.append("title", content.formData.title);
    data.append("genre", content.formData.genre);
    data.append("description", content.formData.description);
    data.append("image", content.formData.image!);
    data.append("content", JSON.stringify(content.content));
    data.append("userid", session?.user.id as string);

    const response = await fetch("http://localhost:3000/api/blogs/create", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        console.log("response", response.json());

        router.push("/");

        console.log("navigated");
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  return (
    <form
      action=""
      onSubmit={(e) => returnData(e)}
      className="grid grid-cols-2  gap-5 w-max bg-white p-10"
    >
      <div className=" col-span-2">Add Details for your blogs</div>
      <ImageUpload />

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
        <Button name="Publish" type="submit" operation={() => {}} />
      </div>
    </form>
  );
}
