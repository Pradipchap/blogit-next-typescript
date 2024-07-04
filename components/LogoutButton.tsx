"use client";

import Button from "./Button";
import deleteCookies from "@/custom_hooks/deleteCookies";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  function handleLogout() {
    deleteCookies("blogit");
    router.refresh();
  }
  return (
    <Button
      icon="Logout"
      iconClassName="text-red-600 text-base"
      className="text-base text-red-600 gap-5 hover:opacity-40"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
