"use client";

import Button from "@/components/Button";
import CustomInput from "@/components/Inputs/CustomInput";
import { BASE_URL, SUBMIT_STATUS } from "@/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page() {
  const params = useSearchParams();
  const router = useRouter();
  const [emailSubmissionStatus, setEmailSubmissionStatus] = useState<
    SUBMIT_STATUS
  >(SUBMIT_STATUS.INACTIVE);
  async function handleChangePassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setEmailSubmissionStatus(SUBMIT_STATUS.PROCESSING);
      const formData = new FormData(e.currentTarget);
      const email = params.get("email");
      const password = formData.get("password");

      const response = await fetch(BASE_URL + "/api/auth/changePassword", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw "";
      }
      setEmailSubmissionStatus(SUBMIT_STATUS.SUCCESS);
      router.push("/auth/login");
    } catch (error) {
      setEmailSubmissionStatus(SUBMIT_STATUS.FAILED);
      setTimeout(() => {
        setEmailSubmissionStatus(SUBMIT_STATUS.INACTIVE);
      }, 3000);
    }
  }
  return (
    <form
      className="flex flex-col gap-2 w-max m-auto mt-20"
      onSubmit={handleChangePassword}
    >
      <CustomInput
        label="Enter a new password"
        name="password"
        className="max-w-64"
      />
      <Button
        status={emailSubmissionStatus}
        type="submit"
        className="bg-blue-700 text-white"
      >
        Change Password
      </Button>
    </form>
  );
}
