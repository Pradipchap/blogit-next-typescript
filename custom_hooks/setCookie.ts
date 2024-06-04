import { CookieInterface } from "@/types/dataTypes";

function setCookie(
  cname: string,
  cvalue: CookieInterface,
  exdays: number | string
) {
  //console.log(exdays);
  const d = new Date();
  let expires = "";
  if (typeof exdays === "number") {
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    expires = "expires=" + d.toUTCString();
    cvalue.expiresIn = d.toUTCString();
  } else {
    expires = "expires=" + exdays;
    cvalue.expiresIn = exdays;
  }

  document.cookie =
    cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
}

export default setCookie;
