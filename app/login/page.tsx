"use client";
import Button from "@/components/Button";
import Checkbox from "@/components/Inputs/Checkbox";
import CustomInput from "@/components/Inputs/CustomInput";
import OrDivider from "@/components/OrDivider";
import { useToast } from "@/custom_hooks/useToast";
import { ErrorInterface, LoginResult } from "@/types/dataTypes";
import { BASE_URL } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../reduxhooks";
import setCookie from "@/custom_hooks/setCookie";
import { fetchSessionData } from "@/redux/SessionSlice";

export default function Page() {
  const { showError, showInfo, showLoading, showSuccess } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  async function handleLogin(formData: FormData) {
    showLoading("logging in");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        console.log("error");
        const error: ErrorInterface = await response.json();
        throw error.errorMessage;
      }
      showSuccess("Login successfull");
      router.push(`/`);
      const result: LoginResult = await response.json();
      setCookie("blogit", JSON.stringify(result), 1);
      fetchSessionData();
    } catch (error) {
      console.log(error);
      showError(error as string);
    }
  }

  async function googleLogin() {
    const response = await fetch(BASE_URL + "/api/google");
    const result = await response.json();
  }

  return (
    <form
      action={handleLogin}
      className="m-auto w-[450px] bg-slate-50 gap-1 flex flex-col p-5"
    >
      <p className="font-bold text-xl py-5">Login </p>
      <CustomInput label="Email" name="email" type="text" />
      <CustomInput label="Password" type="password" name="password" />
      <div className="w-full flex justify-between items-center">
        <Checkbox label="Remember me" name="rememberme" />
        <Link href="/" className="hover:underline text-sm text-green-700">
          Forgot password ?
        </Link>
      </div>
      <Button className="bg-blue-800 text-white mt-5">Login</Button>
      <OrDivider />
      <Button
        className="bg-white text-black border hover:bg-slate-200 transition-all"
        icon="Google"
        onClick={googleLogin}
        type="button"
      >
        Login with Google
      </Button>
    </form>
  );
}
