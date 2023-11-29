import { SignUp } from "@clerk/nextjs"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In | Clerk Organizations Demo",
  description: "Create an account to get started.",
}

export default function SignUpPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <SignUp />
    </div>
  )
}
