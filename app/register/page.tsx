"use client";

import Button from "@/components/Button";
import Checkbox from "@/components/Inputs/Checkbox";
import CustomInput from "@/components/Inputs/CustomInput";
import OrDivider from "@/components/OrDivider";
import { useToast } from "@/custom_hooks/useToast";
import { ErrorInterface } from "@/types/dataTypes";
import { BASE_URL } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { showError, showInfo, showLoading, showSuccess } = useToast();

  async function handleRegister(formData: FormData) {
    showLoading("loading");
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmpassword = formData.get("confirmpassword");
    const rememberme = formData.get("rememberme");
    console.log(email, username, password);
    if (password !== confirmpassword) return;
    try {
      const response = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });
      if (!response.ok) {
        console.log("error");
        const error: ErrorInterface = await response.json();
        throw error.errorMessage;
      }
      showSuccess("User Registered");
      router.push(`/verifyemail?email=${email}`);
    } catch (error) {
      console.log(error);
      showError(error as string);
    }
  }

  return (
    <form
      action={handleRegister}
      className="m-auto w-[450px] bg-slate-50 gap-1 flex flex-col p-5"
    >
      <p className="font-bold text-xl py-5">Login </p>
      <CustomInput label="Email or Username" name="email" type="text" />
      <CustomInput label="Full Name" name="username" type="text" />
      <CustomInput label="Password" type="password" name="password" />
      <CustomInput
        label="Confirm Password"
        type="password"
        name="confirmpassword"
      />
      <div className="w-full flex justify-between items-center">
        <Checkbox label="Remember me" name="rememberme" />
        <Link href="/" className="hover:underline text-sm text-green-700">
          Forgot password ?
        </Link>
      </div>
      <Button className="bg-blue-800 text-white mt-5">Login</Button>
      <OrDivider />
      <Button className="bg-white text-black border" icon="Google">
        Login with Google
      </Button>
    </form>
  );
}
