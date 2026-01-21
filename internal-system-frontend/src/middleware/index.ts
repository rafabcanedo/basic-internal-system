import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

// Work with public routes, definition routes wich route the user next
// and wich route the user redirect
const publicRoutes = [
  { path: "/signin", whenAuthenticated: "redirect" },
  { path: "/signup", whenAuthenticated: "redirect" },
  { path: "/forgot-your-password", whenAuthenticated: "redirect" },
] as const;

// Route what user is redirect when user not authenticate
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/signin";
const REDIRECT_WHEN_AUTHENTICATED_ROUTE = "/dashboard";

// Here we search if the cookie there is, but we not validate if these
// cookie is right, in the future we will go work this.
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("token");

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// Next middleware config default
export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
