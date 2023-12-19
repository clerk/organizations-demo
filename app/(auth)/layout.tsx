import { PropsWithChildren } from "react"

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
