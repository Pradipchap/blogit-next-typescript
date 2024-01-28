"use client";
import React from "react";
import Button from "./Button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button
      icon="Logout"
      iconClassName="text-red-600"
      className="text-base gap-2 hover:scale-105 text-red-600"
      onClick={() => signOut()}
    >
      Logout
    </Button>
  );
}
