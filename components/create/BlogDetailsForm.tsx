"use client";
import  { FormEvent } from "react";
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
  genre,
  image,
  description,
  blogId,
}: {
  getFormData: (formData: detailsForm) => void;
  submit: () => { content: OutputData; formData: detailsForm };
  genre: string;
  title: string;
  image: string;
  onclose: () => void;
  description: string;
  blogId: string;
}) {
  const router = useRouter();
  const { showSuccess, showError, showLoading } = useToast();
  const session = useAppSelector((state) => state.session);

  async function returnData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      showLoading("posting blog");
      const form = e.currentTarget;
      const formdataInstnce = new FormData(form);
      const formdata = Object.fromEntries(
        formdataInstnce.entries()
      ) as detailsForm;
      getFormData(formdata);
      const content = submit();
      const data = new FormData();
      data.append("title", content.formData.title);
      data.append("genre", content.formData.genre);
      data.append("description", content.formData.description);
      data.append("image", content.formData.image!);
      data.append("content", JSON.stringify(content.content));
      data.append("userid", session?.userID as string);
      if (blogId !== "") data.append("blogId", blogId);

      const response = await fetch(`${BASE_URL}/api/blogs/create`, {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw "";
      }
      showSuccess(`Blog ${blogId === "" ? "upload" : "updated"} successful`);
      onclose();
      document.body.style.overflow = "auto";
      sessionStorage.removeItem("editorContent");
      router.push("/");
    } catch (error) {
      showError(`Blog ${blogId === "" ? "upload" : "updated"} unsuccessful`);
    }
  }

  return (
    <form
      action=""
      onSubmit={(e) => returnData(e)}
      className="grid grid-cols-2 rounded gap-5 w-max bg-white p-10"
    >
      <h3 className="col-span-2 text-xl">Add Details for your blogs</h3>
      <ImageUpload required={!image} defaultImage={image} />
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
          defaultValue={genre}
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
          defaultValue={description}
          name="description"
        />
        <Button
          type="submit"
          className="bg-green-600 w-full m-auto text-sm text-white border-none py-2 px-4 hover:bg-green-500"
        >
          Publish
        </Button>
      </div>
    </form>
  );
}
