"use client";

import Button from "@/components/Button";
import CustomInput from "@/components/Inputs/CustomInput";
import OTP from "@/components/Otp";
import setCookie from "@/custom_hooks/setCookie";
import { useToast } from "@/custom_hooks/useToast";
import { BASE_URL } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { showError, showLoading, showSuccess } = useToast();
  const params = useSearchParams();
  const router = useRouter();
  const [isEmailSubmitted, setisEmailSubmitted] = useState(false);

  async function forgotPassword(formData: FormData) {
    try {
      console.log("first");
      const email = await formData.get("email");
      console.log(email);
      const response = await fetch(BASE_URL + "/api/auth/forgotPassword", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        console.log("asd");
        throw "";
      }

      setisEmailSubmitted(true);
      router.push(`?email=${email}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function verifyCode(formData: FormData) {
    let otp = "";
    formData.forEach((element) => {
      otp += element;
    });

    console.log(Number(otp));
    showLoading("loading");
    const email = params.get("email");
    const requestData = { email, code: Number(otp) };

    try {
      const response = await fetch(BASE_URL + "/api/auth/verifyCode", {
        method: "POST",
        body: JSON.stringify(requestData),
      });
      if (await response.ok) {
        showSuccess("User successfully verified");
        const { changePasswordCode } = await response.json();
        setCookie("changePasswordCode", changePasswordCode, 1);
        router.push(`/auth/changePassword?email=${email}`);
      } else {
        throw "";
      }
    } catch (error) {
      showError("user cannot be verified");
    }
  }
  return (
    <div className="min-h-screen w-full mt-10 flex flex-col items-center">
      {isEmailSubmitted ? (
        <form action={verifyCode}>
          <OTP
            title="Reset Password"
            subtitle="Check your email for OTP"
            handleResend={() => {}}
            onchange={() => {}}
          />
          <Button
            type="submit"
            className=" bg-blue-600 w-max px-10 py-2 text-white"
          >
            Submit
          </Button>
        </form>
      ) : (
        <form action={forgotPassword}>
          <CustomInput
            type="email"
            label="Enter your Email"
            className="min-w-64"
            name="email"
          />
          <Button
            type="submit"
            className="bg-blue-600 w-max px-10 py-2 text-white"
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}
