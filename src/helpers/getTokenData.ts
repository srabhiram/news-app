/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {jwtDecode} from "jwt-decode";

export function getTokenData() {
  try {
    const cookies = document.cookie;
    const token = cookies
      .split("; ")
      .find((row) => row.startsWith("userToken="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Token not found");
    }

    const decodedToken: any = jwtDecode(token);

    return {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      isAdmin: decodedToken.isAdmin,
    };
  } catch (error:unknown) {
            return null;
  }
}
