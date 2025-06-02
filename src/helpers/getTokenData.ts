"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function getTokenData() {
  try {
    const cookieStore = (await cookies()).get("userToken");
    if (!cookieStore || !cookieStore.value) {
      return null;
    }
    const decodedToken: any = jwtDecode(cookieStore.value);
    const { id, name, email, isAdmin } = decodedToken;
    return { id, name, email, isAdmin };
  } catch (error: unknown) {
    return null;
  }
}
