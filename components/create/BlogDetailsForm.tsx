"use client";
import React, { FormEvent } from "react";
import Button from "../Button";
import { useSession } from "next-auth/react";
import { OutputData } from "@editorjs/editorjs";
import { detailsForm } from "@/types/createBlogTypes";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { useToast } from "@/custom_hooks/useToast";
import { BASE_URL } from "@/utils/constants";
import CustomInput from "../Inputs/CustomInput";
import { useAppSelector } from "@/app/reduxhooks";

export default function BlogDetailsForm({
  getFormData,
  submit,
  onclose,
  title,
}: {
  getFormData: (formData: detailsForm) => void;
  submit: () => { content: OutputData; formData: detailsForm };
  title: string;
  onclose: () => void;
}) {
  const router = useRouter();
  const { showSuccess, showError, showLoading } = useToast();
  const   session  = useAppSelector(state=>state.session);
  
  async function returnData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showLoading("posting blog");
    const form = e.currentTarget;
    const formdataInstnce = new FormData(form);
    const formdata = Object.fromEntries(
      formdataInstnce.entries()
    ) as detailsForm;
    console.log("formdata", formdata);
    getFormData(formdata);
    const content = submit();
    const data = new FormData();
    data.append("title", content.formData.title);
    data.append("genre", content.formData.genre);
    data.append("description", content.formData.description);
    data.append("image", content.formData.image!);
    data.append("content", JSON.stringify(content.content));
    data.append("userid", session?.userID as string);

    try {
      const response = await fetch(`${BASE_URL}/api/blogs/create`, {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error("Blog upload not successfull");
      }
      showSuccess("Blog upload successfull");
      onclose();
      document.body.style.overflow = "auto";
      sessionStorage.removeItem("editorContent");
      router.push("/");
    } catch (error) {
      console.error("Error uploading blog:", error);
      showError("Blog upload unsuccessful");
    }
  }

  return (
    <form
      action=""
      onSubmit={(e) => returnData(e)}
      className="grid grid-cols-2 rounded gap-5 w-max bg-white p-10"
    >
      <h3 className="col-span-2 text-xl">Add Details for your blogs</h3>
      <ImageUpload required={true} />
      <div className="flex flex-col gap-5">
        <CustomInput
          type="text"
          defaultValue={title}
          placeholder="Blog Title"
          autoFocus
          required
          name="title"
        />
        <CustomInput
          type="text"
          placeholder="Blog genre"
          autoFocus
          required
          name="genre"
        />
        <textarea
          placeholder="Short Description"
          className="outline-none px-3 py-2 bg-gray-50 border-gray-300 border rounded"
          autoFocus
          rows={3}
          minLength={40}
          required
          name="description"
        />
        <Button
          type="submit"
          onClick={() => {}}
          className="bg-green-600 w-full m-auto text-sm text-white border-none py-2 px-4 hover:bg-green-500"
        >
          Publish
        </Button>
      </div>
    </form>
  );
}
