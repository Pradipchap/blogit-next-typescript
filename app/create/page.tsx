"use client";
import Button from "@/components/Button";
import WriteBlog from "@/components/create/WriteBlog";

import React from "react";

export default function Create() {
  return (
    <div className="flex flex-col px-20 ">
      <WriteBlog />
    </div>
  );
}
