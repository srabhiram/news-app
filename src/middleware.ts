import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

// Interface for decoded token (matching getTokenData)
interface DecodedToken {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for non-admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  try {
    // Get token from userToken cookie
    const token = request.cookies.get("userToken")?.value;

    if (!token) {
      console.log("no usertoken found");
      // Redirect to /login without callbackUrl
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Decode token
    const decodedToken: DecodedToken = jwtDecode(token);

    // Check if user is admin
    if (!decodedToken.isAdmin) {
      // Redirect to /login without callbackUrl
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Allow access for admin users
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware token error:", error);
    // Redirect to /login without callbackUrl
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Apply middleware to /admin/* routes
export const config = {
  matcher: ["/admin/:path*"],
};
