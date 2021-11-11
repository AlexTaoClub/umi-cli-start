import Cookies from 'js-cookie';

export const TokenKey = 'admin-token';

export const ExpiresInKey = 'Admin-Expires-In';

export function getCookie(key: string) {
  return Cookies.get(key);
}

// 过期时间按分钟算
export function setCookie(key: string, value: any) {
  return Cookies.set(key, value);
}

export function removeCookie(key: string) {
  return Cookies.remove(key);
}

export function removeAllCookie() {
  Object.keys(Cookies.get()).forEach((cookieName) => {
    var neededAttributes = {};
    Cookies.remove(cookieName, neededAttributes);
  });
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1;
}

export function setExpiresIn(time: string | object) {
  return Cookies.set(ExpiresInKey, time);
}

export function removeExpiresIn() {
  return Cookies.remove(ExpiresInKey);
}
