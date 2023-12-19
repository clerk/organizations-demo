import { auth } from "@clerk/nextjs/server"

export function GET() {
  const { userId } = auth().protect({ role: "org:editor" })

  return new Response(
    JSON.stringify({
      userId,
    })
  )
}
