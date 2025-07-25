import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/shipments", "/offers", "/api(.*)", "/sign-in(.*)", "/sign-up(.*)"]);
const isAdminRout = createRouteMatcher(["/create-shipment, /create-offer"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  if (isAdminRout(request)) {
    const user = await auth.protect();
    if (user.sessionClaims.role !== "admin") {
      return new NextResponse(null, { status: 404 })
    }
  }

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};