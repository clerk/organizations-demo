import "@/styles/globals.css"
import { PropsWithChildren } from "react"
import { ClerkProvider, OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { cn } from "@/utils/cn"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn("min-h-screen font-sans antialiased")}>
          <header>
            <UserButton />
            <OrganizationSwitcher />
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
