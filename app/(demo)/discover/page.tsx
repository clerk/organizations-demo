import * as React from "react"
import { shouldGate } from "@/utils/organizations"
import {
  ClerkLoaded,
  ClerkLoading,
  OrganizationList,
  OrganizationSwitcher,
} from "@clerk/nextjs"
import {
  MyInvitations,
  MyMemberships,
  MySuggestions,
} from "@/components/OrganizationList"

export default function CreateOrganizationPage() {
  return (
    <main
      className={
        "col-span-2 flex h-full w-full items-center justify-center space-y-6 pt-6"
      }
    >
      <div className={"flex flex-col"}>
        <h1 className="mb-4 mt-20">Pre-built OrganizationList</h1>
        <OrganizationList
          hidePersonal={shouldGate}
          afterSelectPersonalUrl="/"
          afterCreateOrganizationUrl="/:id"
          afterSelectOrganizationUrl="/:id"
        />

        <h1 className="mb-4 mt-20">Pre-built OrganizationSwitcher</h1>
        <OrganizationSwitcher />
        <h1 className="mb-4 mt-20">List my memberships</h1>
        <MyMemberships />
        <h1 className="mb-4 mt-20">List my invitations</h1>
        <MyInvitations />
        <h1 className="mb-4 mt-20">List my suggestions</h1>
        <MySuggestions />
      </div>
    </main>
  )
}
