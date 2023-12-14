import { NextResponse } from "next/server"
import { shouldGate } from "@/utils/organizations"
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server"

export default authMiddleware({
  publicRoutes: ["/", /^(\/(sign-in|sign-up|authorization-playground)\/*).*$/],

  afterAuth(auth, req) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    if (shouldGate && req.nextUrl.pathname === "/") {
      const orgSelection = new URL("/discover", req.url)
      return NextResponse.redirect(orgSelection)
    }

    // redirect them to organization selection page
    if (
      shouldGate &&
      auth.userId &&
      !auth.orgId &&
      !auth.isApiRoute &&
      req.nextUrl.pathname !== "/discover"
    ) {
      const orgSelection = new URL("/discover", req.url)
      return NextResponse.redirect(orgSelection)
    }
  },
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
