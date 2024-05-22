"use client";
import React from "react";
import Button from "./Button";

export default function LogoutButton() {
  return (
    <Button
      icon="Logout"
      iconClassName="text-red-600 text-base"
      className="text-base text-red-600 gap-5 hover:opacity-40"
    >
      Logout
    </Button>
  );
}
