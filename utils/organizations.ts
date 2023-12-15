export const shouldGate = process.env.NEXT_PUBLIC_GATING === "true"

export const UserMembershipParams = {
  userMemberships: {
    infinite: true,
  },
}

export const UserInvitationsParams = {
  userInvitations: {
    infinite: true,
  },
}

export const UserSuggestionsParams = {
  userSuggestions: {
    infinite: true,
  },
}

export const OrgMembersParams = {
  memberships: {
    pageSize: 5,
    keepPreviousData: true,
  },
}

export const OrgInvitationsParams = {
  invitations: {
    pageSize: 5,
    // TODO: Seems like keepPreviousData is broken
    keepPreviousData: true,
  },
}
export const OrgMembershipRequestsParams = {
  membershipRequests: {
    pageSize: 5,
    keepPreviousData: true,
  },
}

export const OrgDomainParams = {
  domains: {
    infinite: true,
  },
}
