import { NextResponse } from "next/server";

export function middleware(request) {
  const isAuthenticated = request.cookies.has("auth_token");
  console.log("Middleware check - Auth token exists:", isAuthenticated);
  
  // Define protected routes
  const protectedPaths = ["/", "/dashboard", "/profile", "/settings"];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(path + "/"),
  );

  // If trying to access a protected route without authentication
  if (isProtectedPath && !isAuthenticated) {
    console.log("Redirecting to login - Protected path:", request.nextUrl.pathname);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If already authenticated and trying to access login page
  if (isAuthenticated && 
      (request.nextUrl.pathname === "/login" || 
       request.nextUrl.pathname === "/login")) {
    console.log("Redirecting to dashboard - Already authenticated");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*", 
    "/profile/:path*", 
    "/settings/:path*", 
    "/login", 
    "/login",
  ],
};





