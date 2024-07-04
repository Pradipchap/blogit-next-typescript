import Link from "next/link";


export default function Login() {
  return (
    <Link
      href={"/auth/login"}
      className="text-base borer border-black/70 hover:border-black hover:text-black px-3 py-1 rounded-3xl text-black/70"
    >
      login
    </Link>
  );
}
