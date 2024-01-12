import { ClerkLoading, OrganizationProfile } from "@clerk/nextjs"
import {
  OrgInvitations,
  OrgInviteMemberForm,
  OrgMembers,
  OrgMembershipRequests,
  OrgVerifiedDomains,
} from "@/components/CustomOrganizationProfile"

export default function OrganizationPage() {
  return (
    <main className={"flex h-full w-full items-center justify-center"}>
      <div className={"flex flex-col pb-12"}>
        <h1 className="mb-6 mt-12">UI Component</h1>
        <ClerkLoading>Loading ...</ClerkLoading>
        <OrganizationProfile path="/organization-profile" />
        <h1 className="mb-6 mt-12">Custom List Domains</h1>
        <OrgVerifiedDomains />
        <h1 className="mb-6 mt-12">Custom List Invitations</h1>
        <OrgInvitations />
        <h1 className="mb-6 mt-12">Custom List Membership Requests</h1>
        <OrgMembershipRequests />
        <h1 className="mb-6 mt-12">Custom List Memberships</h1>
        <OrgMembers />
        <h1 className="mb-6 mt-12">Custom Invite Form</h1>
        <OrgInviteMemberForm />
      </div>
    </main>
  )
}
