import Cookies from "js-cookie";

import { SaveToken } from "../../interface/util/cookies";

export const extractedCookiesToken = Cookies.get("token") ?? null;
export const extractedCookiesEuDevice = Cookies.get("eu_device") ?? null;
export const deleteAllCookies = () => {
  const allCookies = Cookies.get();

  for (const cookie in allCookies) {
    Cookies.remove(cookie);
  }
};

export const saveTokenToCookies = (dataAuth: SaveToken) => {
  // Convert seconds to days for js-cookie
  const expiresInDays = dataAuth.token_expire_at / (60 * 60 * 24);

  // Set the token in cookies
  Cookies.set("token", dataAuth.token, { expires: expiresInDays, path: "/" });

  console.log("Token saved in cookies, expires in:", expiresInDays, "days");
};
