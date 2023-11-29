import * as React from "react"
import { CreateOrganization } from "@clerk/nextjs"

export default function CreateOrganizationPage() {
  return (
    <main
      className={
        "col-span-2 flex h-full w-full items-center justify-center space-y-6 pt-6"
      }
    >
      <div className={"flex flex-col"}>
        <h1>UI Component</h1>
        <CreateOrganization />
        <h1>Custom List Domains</h1>
        <h1>Custom List Memberships</h1>
        <h1>Custom List Invitations</h1>
        <h1>Custom List Memberhip Requests</h1>
      </div>
    </main>
  )
}
