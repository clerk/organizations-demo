import * as React from "react"
import { OrganizationList, OrganizationSwitcher } from "@clerk/nextjs"

export default function CreateOrganizationPage() {
  return (
    <main
      className={
        "col-span-2 flex h-full w-full items-center justify-center space-y-6 pt-6"
      }
    >
      <div className={"flex flex-col"}>
        <h1>UI Component Switcher</h1>
        <OrganizationSwitcher />
        <h1>UI Component List</h1>
        <OrganizationList />
        <h1>Custom List User memberships</h1>
        <h1>Custom List User invitations</h1>
        <h1>Custom List User suggestions</h1>
      </div>
    </main>
  )
}
