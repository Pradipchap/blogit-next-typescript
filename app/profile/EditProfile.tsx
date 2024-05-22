
"use client"
import Button from "@/components/Button";
import CustomInput from "@/components/Inputs/CustomInput";
import ImageUpload from "@/components/create/ImageUpload";
import { useToast } from "@/custom_hooks/useToast";
import { BASE_URL } from "@/utils/constants";

import React from "react";
import { useAppSelector } from "../reduxhooks";

export default function EditProfile({ onclose }: { onclose: () => void }) {
  const session = useAppSelector((state) => state.session);
  console.log("session",session)
  const { showSuccess, showError, showLoading } = useToast();

  async function handleSubmit(formData: FormData) {
    showLoading("Profile is updating");
    const phone = formData.get("phone");
    const dateofbirth = formData.get("dateofbirth");
    const image = formData.get("image");
    console.log(phone, dateofbirth, image);
    try {
      const response = await fetch(`${BASE_URL}/api/blogs/create`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Blog upload not successfull");
      }
      showSuccess("Blog upload successfull");
      onclose();
      document.body.style.overflow = "auto";
      sessionStorage.removeItem("editorContent");
    } catch (error) {
      console.error("Error uploading blog:", error);
      showError("Blog upload unsuccessful");
    }
  }
  return (
    <form
      action={handleSubmit}
      className="bg-white p-5 w-[450px] items-center justify-center flex flex-col gap-5"
    >
      <p className="h-10 text-xl ">Edit Profile</p>
      <ImageUpload
        defaultImage={session?.image || undefined}
        shape="circle"
        className="h-32 w-32"
      />
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="name" className=" text-sm text-gray-500">
          Display Name
        </label>
        <CustomInput
          defaultValue={session.username || ""}
          name="name"
          disabled
          className="px-0 bg-transparent border-b border-x-0 rounded-none border-t-0
				"
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email" className=" text-sm text-gray-500">
          Email Address
        </label>
        <CustomInput
          defaultValue={session?.email || ""}
          name="email"
          disabled
          className="px-0 bg-transparent border-b border-x-0 rounded-none border-t-0
				"
        />
      </div>
      <div className="flex flex-col gap-1 w-full ">
        <label htmlFor="phone" className=" text-sm text-gray-500">
          Phone
        </label>
        <CustomInput
          // @ts-ignore
          defaultValue={session?.user?.phone || ""}
          name="phone"
          className="px-0 bg-transparent border-b border-x-0 rounded-none border-t-0
				"
        />
      </div>
      <div className="flex flex-col gap-1 w-full ">
        <label htmlFor="dateofbirth" className=" text-sm text-gray-500">
          Date of Birth
        </label>
        <CustomInput
          // @ts-ignore
          defaultValue={new Date(session?.user?.dateofbirth||new Date())
            .toISOString()
            .substring(0, 10)}
          name="dateofbirth"
          type="date"
          className="px-0 w-full self-start bg-transparent border-b border-x-0 rounded-none border-t-0
				"
        />
      </div>
      <Button
        type="submit"
        className="mt-5 bg-green-600 text-white w-full py-2 hover:bg-green-700 transition-all"
      >
        Save
      </Button>
    </form>
  );
}
