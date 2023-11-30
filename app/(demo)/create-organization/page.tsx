import * as React from "react"
import { CreateOrganization } from "@clerk/nextjs"
import { CustomCreateOrganizationForm } from "@/components/CreateOrganization"
import { MyMemberships } from "@/components/OrganizationList"

export default function CreateOrganizationPage() {
  return (
    <main
      className={
        "col-span-2 m-auto flex h-full w-full max-w-md items-center justify-center space-y-6 pt-6"
      }
    >
      <div className={"flex w-full flex-col"}>
        <h1>UI Component</h1>
        <CreateOrganization />
        <h1 className="mb-4 mt-20">Custom UI </h1>
        <CustomCreateOrganizationForm />
        <h2 className="mb-4 mt-8">List your memberships</h2>
        <MyMemberships />
      </div>
    </main>
  )
}
