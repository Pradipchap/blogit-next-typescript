"use client";

import Button from "@/components/Button";
import Checkbox from "@/components/Inputs/Checkbox";
import CustomInput from "@/components/Inputs/CustomInput";
import OrDivider from "@/components/OrDivider";
import { useToast } from "@/custom_hooks/useToast";
import { ErrorInterface } from "@/types/dataTypes";
import { BASE_URL, SUBMIT_STATUS } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const { showError, showLoading, showSuccess } = useToast();
  const [registerStatus, setRegisterStatus] = useState<SUBMIT_STATUS>(
    SUBMIT_STATUS.INACTIVE
  );
  async function handleRegister(formData: FormData) {
    showLoading("loading");
    setRegisterStatus(SUBMIT_STATUS.PROCESSING);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmpassword = formData.get("confirmpassword");
    const rememberme = formData.get("rememberme");
    if (password !== confirmpassword) return;
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });
      if (!response.ok) {
        const error: ErrorInterface = await response.json();
        throw error.errorMessage;
      }
      setRegisterStatus(SUBMIT_STATUS.SUCCESS);
      showSuccess("User Registered");
      router.push(`/auth/verifyemail?email=${email}`);
    } catch (error) {
      setRegisterStatus(SUBMIT_STATUS.FAILED);
      showError(error as string);
      setTimeout(() => {
        setRegisterStatus(SUBMIT_STATUS.INACTIVE);
      }, 2000);
    }
  }

  return (
    <form
      action={handleRegister}
      className="m-auto w-[450px] bg-slate-50 gap-1 flex flex-col p-5"
    >
      <p className="font-bold text-xl py-5">Register your Account </p>
      <CustomInput label="Email" name="email" type="text" required />
      <CustomInput label="Full Name" name="username" type="text" required />
      <CustomInput label="Password" type="password" name="password" required />
      <CustomInput
        label="Confirm Password"
        required
        type="password"
        name="confirmpassword"
      />
      <div className="w-full flex justify-between items-center">
        <Checkbox label="Remember me" name="rememberme" />
      </div>
      <Button
        status={registerStatus}
        disabled={registerStatus !== SUBMIT_STATUS.INACTIVE}
        className="bg-blue-800 text-white mt-5"
      >
        Register
      </Button>
      <OrDivider />
      <Button className="bg-white text-black border" icon="Google">
        Login with Google
      </Button>
    </form>
  );
}
