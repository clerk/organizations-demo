"use client"

import { useOrganization, useUser } from "@clerk/nextjs"
import {
  OrgDomainParams,
  OrgInvitationsParams,
  OrgMembershipRequestsParams,
  OrgMembersParams,
} from "@/utils/organizations"
import { useState } from "react"
import { OrganizationCustomRoleKey } from "@clerk/types"
import { SelectRole } from "@/components/SelectRole"

export const OrgMembers = () => {
  const { user } = useUser()
  const { isLoaded, memberships } = useOrganization(OrgMembersParams)

  if (!isLoaded) {
    return <>Loading</>
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Joined</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {memberships?.data?.map((mem) => (
            <tr key={mem.id}>
              <td>
                {mem.publicUserData.identifier}{" "}
                {mem.publicUserData.userId === user?.id && "(You)"}
              </td>
              <td>{mem.createdAt.toLocaleDateString()}</td>
              <td>
                <SelectRole
                  defaultRole={mem.role}
                  onChange={async (e) => {
                    await mem.update({
                      role: e.target.value as OrganizationCustomRoleKey,
                    })
                    await memberships?.revalidate()
                  }}
                />
              </td>
              <td>
                <button
                  onClick={async () => {
                    await mem.destroy()
                    await memberships?.revalidate()
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex">
        <button
          className="inline-block"
          disabled={!memberships?.hasPreviousPage || memberships?.isFetching}
          onClick={() => memberships?.fetchPrevious?.()}
        >
          Previous
        </button>

        <button
          className="inline-block"
          disabled={!memberships?.hasNextPage || memberships?.isFetching}
          onClick={() => memberships?.fetchNext?.()}
        >
          Next
        </button>
      </div>
    </>
  )
}

export const OrgInvitations = () => {
  const { isLoaded, invitations, memberships } = useOrganization({
    ...OrgInvitationsParams,
    ...OrgMembersParams,
  })

  if (!isLoaded) {
    return <>Loading</>
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Invited</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invitations?.data?.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.emailAddress}</td>
              <td>{inv.createdAt.toLocaleDateString()}</td>
              <td>{inv.role}</td>
              <td>
                <button
                  onClick={async () => {
                    await inv.revoke()
                    await Promise.all([
                      memberships?.revalidate,
                      invitations?.revalidate,
                    ])
                  }}
                >
                  Revoke
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex">
        <button
          className="inline-block"
          disabled={!invitations?.hasPreviousPage || invitations?.isFetching}
          onClick={() => invitations?.fetchPrevious?.()}
        >
          Previous
        </button>

        <button
          className="inline-block"
          disabled={!invitations?.hasNextPage || invitations?.isFetching}
          onClick={() => invitations?.fetchNext?.()}
        >
          Next
        </button>
      </div>
    </>
  )
}

export const OrgMembershipRequests = () => {
  const { isLoaded, membershipRequests } = useOrganization(
    OrgMembershipRequestsParams
  )

  if (!isLoaded) {
    return <>Loading</>
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Requested Access</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {membershipRequests?.data?.map((mem) => (
            <tr key={mem.id}>
              <td>{mem.publicUserData.identifier}</td>
              <td>{mem.createdAt.toLocaleDateString()}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex">
        <button
          className="inline-block"
          disabled={
            !membershipRequests?.hasPreviousPage ||
            membershipRequests?.isFetching
          }
          onClick={() => membershipRequests?.fetchPrevious?.()}
        >
          Previous
        </button>

        <button
          className="inline-block"
          disabled={
            !membershipRequests?.hasNextPage || membershipRequests?.isFetching
          }
          onClick={() => membershipRequests?.fetchNext?.()}
        >
          Next
        </button>
      </div>
    </>
  )
}

export const OrgVerifiedDomains = () => {
  const { isLoaded, domains } = useOrganization(OrgDomainParams)

  if (!isLoaded) {
    return <>Loading</>
  }

  return (
    <>
      <ul>
        {domains?.data?.map((domain) => (
          <li key={domain.id} className="flex w-full justify-between">
            <span>{domain.name}</span>
            <div>
              <button
                onClick={async () => {
                  await domain.delete()
                  await domains?.revalidate()
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="inline-block"
        disabled={!domains?.hasNextPage}
        onClick={() => domains?.fetchNext?.()}
      >
        {domains?.hasNextPage ? "Load more" : "No more to load"}
      </button>
    </>
  )
}

export const OrgInviteMemberForm = () => {
  const { isLoaded, organization, invitations } =
    useOrganization(OrgInvitationsParams)
  const [emailAddress, setEmailAddress] = useState("")
  const [disabled, setDisabled] = useState(false)

  if (!isLoaded || !organization) {
    return <>Loading</>
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const submittedData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    ) as {
      email: string | undefined
      role: OrganizationCustomRoleKey | undefined
    }

    if (!submittedData.email || !submittedData.role) {
      return
    }

    setDisabled(true)
    await organization.inviteMember({
      emailAddress: submittedData.email,
      role: submittedData.role,
    })
    await invitations?.revalidate?.()
    setEmailAddress("")
    setDisabled(false)
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        type="text"
        placeholder="Email address"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
      />
      <label>Role</label>
      <SelectRole fieldName={"role"} />
      <button type="submit" disabled={disabled}>
        Invite
      </button>
    </form>
  )
}
