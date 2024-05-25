"use client";

import Button from "@/components/Button";
import CustomInput from "@/components/Inputs/CustomInput";
import { BASE_URL } from "@/utils/constants";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  async function handleChangePassword(formData: FormData) {
    const email = params.get("email");
    const password = formData.get("password");
    try {
      const response = await fetch(BASE_URL + "/api/auth/changePassword", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw "";
      }
    } catch (error) {}
  }
  return (
    <form className="flex flex-col gap-2" action={handleChangePassword}>
      <CustomInput label="Enter a new password" name="password" />
      <Button type="submit">Change Password</Button>
    </form>
  );
}
