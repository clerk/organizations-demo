import { auth, clerkClient } from "@clerk/nextjs"

export function GET() {
  //   TODO: Find a usecase for this
  // const { userId } = auth().protect((has) => has({ role: "admin" }))
  const { userId } = auth().protect({ role: "org:editor" })
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
