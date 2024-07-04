"use client";
import OTP from "@/components/Otp";
import Button from "@/components/Button";
import { useToast } from "@/custom_hooks/useToast";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function EmailVerification() {
  const { showError, showLoading, showSuccess } = useToast();
  const params = useSearchParams();
  const router = useRouter();

  async function EmailVerificationHandler(formData: FormData) {
    let otp = "";
    formData.forEach((element) => {
      otp += element;
    });
    showLoading("loading");
    const email = params.get("email");
    const requestData = { email, code: Number(otp) };

    try {
      const response = await fetch(BASE_URL + "/api/auth/verifyemail", {
        method: "POST",
        body: JSON.stringify(requestData),
      });
      if (await response.ok) {
        showSuccess("User successfully verified");
        router.push("/auth/login");
      } else {
        showError("user cannot be verified");
      }
    } catch (error) {
      showError("user cannot be verified");
    }
  }
  return (
    <form
      className="flex flex-col gap-4 p-5 min-h-screen w-full items-center"
      action={EmailVerificationHandler}
    >
      <OTP
        title="Email verification"
        handleResend={() => {}}
        onchange={() => {}}
        subtitle="Enter verification code sent to your mail"
      />
      <Button type="submit" className="bg-blue-800 text-white w-max">
        Submit
      </Button>
    </form>
  );
}

export default function Page() {
  return (
    <Suspense>
      <EmailVerification />
    </Suspense>
  );
}
