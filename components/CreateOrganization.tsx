"use client"
import { useOrganizationList } from "@clerk/nextjs"
import { FormEventHandler, useState } from "react"
import { UserMembershipParams } from "@/utils/organizations"

export function CustomCreateOrganizationForm() {
  const { isLoaded, createOrganization, setActive, userMemberships } =
    useOrganizationList({
      userMemberships: UserMembershipParams,
    })
  const [isLoading, setLoading] = useState(false)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (!isLoaded) {
      return null
    }
    setLoading(true)

    const submittedData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    ) as { organizationName: string | undefined; asActive?: "on" }

    if (!submittedData.organizationName) {
      return
    }

    try {
      const organization = await createOrganization({
        name: submittedData.organizationName,
      })
      void userMemberships?.revalidate()
      if (submittedData.asActive === "on") {
        await setActive({ organization })
      }
    } finally {
      if (e.target instanceof HTMLFormElement) {
        e.target.reset()
      }
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full">
        <label htmlFor="orgName">Organization Name</label>
        <input
          id="orgName"
          type="text"
          name="organizationName"
          placeholder="e.g. Acme Co"
          disabled={isLoading}
        />
      </div>
      <div className="flex w-full gap-1">
        <label htmlFor="asActive" className="grow-0">
          Set as active
        </label>
        <input
          id="asActive"
          type="checkbox"
          name="asActive"
          defaultChecked={true}
          className="inline-block"
          disabled={isLoading}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        Create organization {isLoading && "(Submitting)"}
      </button>
    </form>
  )
}
