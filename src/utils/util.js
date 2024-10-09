import { jwtDecode } from "jwt-decode";

export function isValidToken(token) {
  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    if (!decodedToken) return null;

    return Date.now() < decodedToken.exp * 1000;
  } catch (error) {
    console.log(error);
    return null;
  }
}
