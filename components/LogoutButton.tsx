"use client";

import Button from "./Button";
import deleteCookies from "@/custom_hooks/deleteCookies";
import { fetchSessionData } from "@/redux/SessionSlice";

export default function LogoutButton() {
  function handleLogout() {
    deleteCookies("blogit");
    window.location.reload();
    fetchSessionData();
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
