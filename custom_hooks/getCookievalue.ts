import { CookieInterface, LoginResult } from "@/types/dataTypes";

export default function getProjectCookieValue(): CookieInterface | null {
  const cookieName = "blogit";
  const cookieValue = getCookieByName(cookieName);
  if (cookieValue === "") return null;
  const parsedValue: CookieInterface = JSON.parse(cookieValue);
  return parsedValue;
}

export function getCookieByName(cname: string) {
  const name = cname + "=";
  if (typeof document === "undefined") return "";

  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
