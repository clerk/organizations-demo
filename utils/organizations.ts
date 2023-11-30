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
