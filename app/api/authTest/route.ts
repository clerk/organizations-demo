import { auth } from "@clerk/nextjs/server"

export function GET() {
  const { userId, orgRole } = auth()
  return new Response(JSON.stringify({ userId, orgRole }))
}
