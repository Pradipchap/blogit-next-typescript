"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  return (
    <main>
      <p>{session?.user.id}</p>
      <button onClick={() => signIn()}>click</button>
    </main>
  );
}
