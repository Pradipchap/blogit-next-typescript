"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import EditorJs from "@/components/editorjs/Editor";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();

  function submit() {}
  return <main>home page</main>;
}
