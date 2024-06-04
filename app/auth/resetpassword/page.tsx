"use client";

import Button from "@/components/Button";
import CustomInput from "@/components/Inputs/CustomInput";
import OTP from "@/components/Otp";
import setCookie from "@/custom_hooks/setCookie";
import { useToast } from "@/custom_hooks/useToast";
import { BASE_URL, SUBMIT_STATUS } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function Form() {
  const { showError } = useToast();
  const params = useSearchParams();
  const router = useRouter();
  const [isEmailSubmitted, setisEmailSubmitted] = useState(false);
  const [emailSubmissionStatus, setEmailSubmissionStatus] = useState<
    SUBMIT_STATUS
  >(SUBMIT_STATUS.INACTIVE);
  const [codeSubmissionStatus, setCodeSubmissionStatus] = useState<
    SUBMIT_STATUS
  >(SUBMIT_STATUS.INACTIVE);

  async function forgotPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setEmailSubmissionStatus(SUBMIT_STATUS.PROCESSING);
      const formData = new FormData(e.currentTarget);
      const email = await formData.get("email");
      //console.log(email);
      const response = await fetch(BASE_URL + "/api/auth/forgotPassword", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        //console.log("asd");
        throw "";
      }
      setEmailSubmissionStatus(SUBMIT_STATUS.SUCCESS);
      setisEmailSubmitted(true);
      router.push(`?email=${email}`);
    } catch (error) {
      setEmailSubmissionStatus(SUBMIT_STATUS.FAILED);
      showError((error as string) || "failed, try again");
      //console.log(error);
      setTimeout(() => {
        setEmailSubmissionStatus(SUBMIT_STATUS.INACTIVE);
      }, 3000);
    }
  }

  async function verifyCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCodeSubmissionStatus(SUBMIT_STATUS.PROCESSING);
    const formData = new FormData(e.currentTarget);
    let otp = "";
    formData.forEach((element) => {
      otp += element;
    });

    //console.log(Number(otp));

    const email = params.get("email");
    const requestData = { email, code: Number(otp) };

    try {
      const response = await fetch(BASE_URL + "/api/auth/verifyCode", {
        method: "POST",
        body: JSON.stringify(requestData),
      });
      if (await response.ok) {
        setCodeSubmissionStatus(SUBMIT_STATUS.SUCCESS);
        const { changePasswordCode } = await response.json();
        setCookie("changePasswordCode", changePasswordCode, 1);
        router.push(`/auth/changePassword?email=${email}`);
      } else {
        throw "";
      }
    } catch (error) {
      setCodeSubmissionStatus(SUBMIT_STATUS.FAILED);
      showError("user cannot be verified");
      setTimeout(() => {
        setEmailSubmissionStatus(SUBMIT_STATUS.INACTIVE);
      }, 3000);
    }
  }
  return (
    <div className="min-h-screen w-full mt-10 flex flex-col items-center">
      {isEmailSubmitted ? (
        <form onSubmit={verifyCode}>
          <OTP
            title="Reset Password"
            subtitle="Check your email for OTP"
            handleResend={() => {}}
            onchange={() => {}}
          />
          <Button
            status={codeSubmissionStatus}
            type="submit"
            className=" bg-blue-600 w-full px-10 py-2 text-white"
          >
            Submit
          </Button>
        </form>
      ) : (
        <form onSubmit={forgotPassword}>
          <CustomInput
            type="email"
            label="Enter your Email"
            className="min-w-64"
            name="email"
          />
          <Button
            status={emailSubmissionStatus}
            type="submit"
            className="bg-blue-600 w-full px-10 py-2 text-white"
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Form />
    </Suspense>
  );
}
