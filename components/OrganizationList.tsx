"use client"

import { useOrganizationList } from "@clerk/nextjs"
import {
  UserInvitationsParams,
  UserMembershipParams,
  UserSuggestionsParams,
} from "@/utils/organizations"
import { useRouter } from "next/navigation"

export const MyMemberships = () => {
  const { push } = useRouter()
  const { isLoaded, setActive, userMemberships } =
    useOrganizationList(UserMembershipParams)

  if (!isLoaded) {
    return <>Loading</>
  }

  return (
    <>
      <ul>
        {userMemberships.data?.map((mem) => (
          <li key={mem.id} className="flex w-full justify-between">
            <span>{mem.organization.name}</span>
            <div>
              <button
                onClick={() => setActive({ organization: mem.organization.id })}
              >
                Select
              </button>
              <button
                onClick={() =>
                  setActive({
                    organization: mem.organization.id,
                    beforeEmit: () => {
                      push("/organization")
                    },
                  })
                }
              >
                Redirect
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="inline-block"
        disabled={!userMemberships.hasNextPage}
        onClick={() => userMemberships.fetchNext()}
      >
        {userMemberships.hasNextPage ? "Load more" : "No more to load"}
      </button>
    </>
  )
}

export const MyInvitations = () => {
  const { isLoaded, setActive, userInvitations, userMemberships } =
    useOrganizationList({
      ...UserInvitationsParams,
      ...UserMembershipParams,
    })

  if (!isLoaded) {
    return <>Loading</>
  }

  return (
    <>
      <ul>
        {userInvitations.data?.map((mem) => (
          <li key={mem.id} className="flex w-full justify-between">
            <span>{mem.publicOrganizationData.name}</span>
            <div>
              <button
                onClick={async () => {
                  await mem.accept()
                  await userMemberships.revalidate()
                  await userInvitations.revalidate()
                }}
              >
                Accept
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="inline-block"
        disabled={!userInvitations.hasNextPage}
        onClick={() => userInvitations.fetchNext()}
      >
        {userInvitations.hasNextPage ? "Load more" : "No more to load"}
      </button>
    </>
  )
}

export const MySuggestions = () => {
  const { isLoaded, setActive, userSuggestions, userMemberships } =
    useOrganizationList({
      ...UserSuggestionsParams,
      ...UserMembershipParams,
    })

  if (!isLoaded) {
    return <>Loading</>
  }

  return (
    <>
      <ul>
        {userSuggestions.data?.map((mem) => (
          <li key={mem.id} className="flex w-full justify-between">
            <span>{mem.publicOrganizationData.name}</span>
            <div>
              <button
                onClick={async () => {
                  await mem.accept
                  await userMemberships.revalidate()
                  await userSuggestions.revalidate()
                }}
              >
                Request to join
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="inline-block"
        disabled={!userSuggestions.hasNextPage}
        onClick={() => userSuggestions.fetchNext()}
      >
        {userSuggestions.hasNextPage ? "Load more" : "No more to load"}
      </button>
    </>
  )
}
