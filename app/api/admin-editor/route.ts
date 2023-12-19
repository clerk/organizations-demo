import { auth } from "@clerk/nextjs/server"

export function GET() {
  const { userId, has } = auth()

  if (!userId) {
    return new Response(null, {
      status: 401,
    })
  }

  if (!has({ role: "org:admin" }) && !has({ role: "org:editor" })) {
    return new Response(null, {
      status: 403,
    })
  }

  return new Response(
    JSON.stringify({
      userId,
    })
  )
}
