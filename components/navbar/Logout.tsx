import Link from "next/link";
import React from "react";

export default function Login() {
  return <Link href={"/auth/login"} className="border border-blue-600 px-3 py-1 rounded-3xl text-black">Login</Link>;
}
