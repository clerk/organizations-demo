import * as React from "react"
import { ClerkLoading, OrganizationProfile } from "@clerk/nextjs"

export default function CreateOrganizationPage() {
  return (
    <main
      className={
        "col-span-2 flex h-full w-full items-center justify-center space-y-6 pt-6"
      }
    >
      <div className={"flex flex-col"}>
        <h1>UI Component</h1>
        <ClerkLoading>Loading ...</ClerkLoading>
        <OrganizationProfile />
        <h1>Custom List Domains</h1>
        {/*TODO: Implement*/}
        <h1>Custom List Memberships</h1>
        {/*TODO: Implement*/}
        <h1>Custom List Invitations</h1>
        {/*TODO: Implement*/}
        <h1>Custom List Membership Requests</h1>
        {/*TODO: Implement*/}
      </div>
    </main>
  )
}
