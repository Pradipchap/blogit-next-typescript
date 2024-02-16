"use client";
import React from "react";
import Button from "./Button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button
      icon="Logout"
      iconClassName="text-red-600 text-base"
      className="text-base text-red-600 gap-5 hover:opacity-40"
      onClick={() => signOut()}
    >
      Logout
    </Button>
  );
}
