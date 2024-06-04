"use client";

import Button from "@/components/Button";
import Checkbox from "@/components/Inputs/Checkbox";
import CustomInput from "@/components/Inputs/CustomInput";
import OrDivider from "@/components/OrDivider";
import { useToast } from "@/custom_hooks/useToast";
import {
  CookieInterface,
  ErrorInterface,
  LoginResult,
} from "@/types/dataTypes";
import { BASE_URL, SUBMIT_STATUS } from "@/utils/constants";
import Link from "next/link";
import setCookie from "@/custom_hooks/setCookie";
import { fetchSessionData } from "@/redux/SessionSlice";
import { FormEvent, useState } from "react";

export default function Page() {
  const { showError } = useToast();
  const [loginStatus, setLoginStatus] = useState<SUBMIT_STATUS>(
    SUBMIT_STATUS.INACTIVE
  );

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //console.log(e);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");
    setLoginStatus(SUBMIT_STATUS.PROCESSING);
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        setLoginStatus(SUBMIT_STATUS.SUCCESS);
        const result: CookieInterface = await response.json();
        //console.log(result);
        setCookie("blogit", result, 1);
        fetchSessionData();
        window.location.assign("/");
      } else {
        //console.log("error");
        const error: ErrorInterface = await response.json();
        throw error.errorMessage;
      }
    } catch (error) {
      //console.log(error);
      setLoginStatus(SUBMIT_STATUS.FAILED);
      showError(error as string);
      setTimeout(() => {
        setLoginStatus(SUBMIT_STATUS.INACTIVE);
      }, 2000);
    }
  }

  async function googleLogin() {
    const response = await fetch(BASE_URL + "/api/google");
    const result = await response.json();
  }

  return (
    <form
      onSubmit={handleLogin}
      className="m-auto w-[450px] bg-slate-50 gap-1 flex flex-col p-5"
    >
      <p className="font-bold text-xl py-5">Login </p>
      <CustomInput label="Email" name="email" type="text" required />
      <CustomInput label="Password" type="password" name="password" required />
      <div className="w-full flex justify-between items-center">
        <Checkbox label="Remember me" name="rememberme" />
        <Link
          href="/auth/resetpassword"
          className="hover:underline text-sm text-green-700"
        >
          Forgot password ?
        </Link>
      </div>
      <Button
        status={loginStatus}
        disabled={loginStatus !== SUBMIT_STATUS.INACTIVE}
        className="bg-blue-800 text-white mt-5"
      >
        Login
      </Button>
      <OrDivider />
      <Button
        className="bg-white text-black border hover:bg-slate-200 transition-all"
        icon="Google"
        onClick={googleLogin}
        type="button"
      >
        Login with Google
      </Button>

      <Link
        href={"/auth/register"}
        className="m-auto mt-3  hover:underline transition-all text-red-600"
      >
        Already have an account ?
      </Link>
    </form>
  );
}
