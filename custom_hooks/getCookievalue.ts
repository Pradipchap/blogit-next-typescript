import { LoginResult } from "@/types/dataTypes";

export default function getProjectCookieValue(): LoginResult | null {
  const cookieName = "blogit";
  console.log("first")
  const cookieValue = getCookieByName(cookieName);
  console.log("first")
  if (cookieValue === "") return null;
  const parsedValue: LoginResult = JSON.parse(cookieValue);
  console.log(parsedValue)
  return parsedValue;
}

export function getCookieByName(cname: string) {
  const name = cname + "=";
  console.log(document.cookie)
  const decodedCookie = decodeURIComponent(document.cookie);
  console.log(decodedCookie)
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
