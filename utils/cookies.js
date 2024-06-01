import Cookies from "js-cookie";

export function insertToken({ token, refreshToken }) {
  Cookies.set("token", token);
  Cookies.set("refresh_token", refreshToken);
}

export function getToken() {
  const token = Cookies.get("token");
  const refreshToken = Cookies.get("refresh_token");
  return { token, refreshToken };
}

export function deleteToken() {
  Cookies.remove("token");
  Cookies.remove("refresh_token");
}

export function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(";").forEach((cookie) => {
      const [name, value] = cookie.split("=").map((c) => c.trim());
      cookies[name] = decodeURIComponent(value);
    });
  }
  return cookies;
}
