"use client";
import WriteBlog from "@/components/create/WriteBlog";
import { useToast } from "@/custom_hooks/useToast";
import React from "react";

export default function Create() {
  return (
    <div className="flex flex-col px-3 sm:px-10 md:px-20">
      <WriteBlog />
    </div>
  );
}
