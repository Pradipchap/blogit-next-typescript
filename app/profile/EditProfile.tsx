"use client";
import Button from "@/components/Button";
import CustomInput from "@/components/Inputs/CustomInput";
import ImageUpload from "@/components/create/ImageUpload";
import { useToast } from "@/custom_hooks/useToast";
import { BASE_URL, SUBMIT_STATUS } from "@/utils/constants";
import React, { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../reduxhooks";
import setCookie from "@/custom_hooks/setCookie";
import { CookieInterface } from "@/types/dataTypes";
import updateProfile from "@/custom_hooks/updateProfile";
import { fetchSessionData } from "@/redux/SessionSlice";

export default function EditProfile({ onclose }: { onclose: () => void }) {
  const session = useAppSelector((state) => state.session);
  const dispatch = useAppDispatch();
  console.log(session);
  const { showError } = useToast();
  const [profileEditStatus, setProfileEditStatus] = useState<SUBMIT_STATUS>(
    SUBMIT_STATUS.INACTIVE
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProfileEditStatus(SUBMIT_STATUS.PROCESSING);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch(`${BASE_URL}/api/auth/editprofile`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("profile edit not successfull");
      }
      const data = await response.json();
      setProfileEditStatus(SUBMIT_STATUS.SUCCESS);
      updateProfile(await data.profile, session.expiresIn, session.accessToken);
      dispatch(fetchSessionData());
      document.body.style.overflow = "auto";
      sessionStorage.removeItem("editorContent");
      onclose();
    } catch (error) {
      console.error("Error updating profile:", error);
      setProfileEditStatus(SUBMIT_STATUS.FAILED);
      showError("profile edit unsuccessful");
      setTimeout(() => {
        setProfileEditStatus(SUBMIT_STATUS.INACTIVE);
      }, 3000);
    }
  }
  console.log(session);
  return (
    <form
      onSubmit={handleSubmit}
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
          defaultValue={session?.phone || ""}
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
          defaultValue={new Date(session?.user?.dateofbirth || new Date())
            .toISOString()
            .substring(0, 10)}
          name="dateofbirth"
          type="date"
          className="px-0 w-full self-start bg-transparent border-b border-x-0 rounded-none border-t-0
				"
        />
      </div>
      <Button
        status={profileEditStatus}
        type="submit"
        className="mt-5 bg-green-600 text-white w-full py-2 hover:bg-green-700 transition-all"
      >
        Save
      </Button>
    </form>
  );
}
