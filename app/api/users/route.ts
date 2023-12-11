import { auth, clerkClient } from "@clerk/nextjs"

export function GET() {
  // const { userId } = auth().protect((has) => has({ role: "admin" }))
  const { userId } = auth().protect({ role: "admin" })
  // const { userId, ahas } = auth()
  //
  // if (!has({ role: "admin" }) || !userId) {
  //
  // }
  //
  // clerkClient.users.getUser(userId)

  return new Response(
    JSON.stringify({
      userId,
    })
  )
}
