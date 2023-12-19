import { SignUp } from "@clerk/nextjs"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In | Clerk Organizations Demo",
  description: "Create an account to get started.",
}

export default function SignUpPage() {
  return <SignUp />
}
