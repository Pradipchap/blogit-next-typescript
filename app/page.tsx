"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import EditorJs from "@/components/editorjs/Editor";
export default function Home() {
  const { data: session } = useSession();
  function submit() {}
  return (
    <main>
      <p>{session?.user.name}</p>
      <button onClick={() => signIn()}>click</button>
      <button onClick={submit}></button>
      <EditorJs />
    </main>
  );
}
