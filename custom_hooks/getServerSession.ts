import { LoginResult } from "@/types/dataTypes";
import { cookies } from "next/headers";

export default function getServerSession() {
  const session: LoginResult = JSON.parse(cookies().get("blogit")?.value || "");
  return session;
}
