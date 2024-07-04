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
      showSuccess("User Registered");
      router.push(`auth/verifyemail?email=${email}`);
    } catch (error) {
      showError(error as string);
    }
  }

  return (
    <form
      action={handleRegister}
      className="m-auto w-[450px] bg-slate-50 gap-1 flex flex-col p-5"
    >
      <p className="font-bold text-xl py-5">Register your Account </p>
      <CustomInput label="Email or Username" name="email" type="text" required />
      <CustomInput label="Full Name" name="username" type="text" required/>
      <CustomInput label="Password" type="password" name="password" required />
      <CustomInput
        label="Confirm Password"
        required
        type="password"
        name="confirmpassword"
      />
      <div className="w-full flex justify-between items-center">
        <Checkbox label="Remember me" name="rememberme" />
        <Link href="/" className="hover:underline text-sm text-green-700">
          Forgot password ?
        </Link>
      </div>
      <Button className="bg-blue-800 text-white mt-5">Register</Button>
      <OrDivider />
      <Button className="bg-white text-black border" icon="Google">
        Login with Google
      </Button>
    </form>
  );
}
