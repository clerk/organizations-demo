import "@/styles/globals.css"
import { PropsWithChildren } from "react"
import {
  ClerkLoading,
  ClerkProvider,
  OrganizationSwitcher,
  UserButton,
} from "@clerk/nextjs"
import { cn } from "@/utils/cn"
import Link from "next/link"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn("min-h-screen font-sans antialiased")}>
          <header className="m-auto flex min-h-[72px] w-full max-w-lg justify-between py-5">
            <ClerkLoading>Loading ...</ClerkLoading>
            <OrganizationSwitcher
              appearance={{
                elements: {
                  rootBox: "flex",
                },
              }}
            />
            <Link href="https://github.com/clerk/organizations-demo">
              Github
            </Link>
            <UserButton
              appearance={{
                elements: {
                  rootBox: "flex",
                },
              }}
            />
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
