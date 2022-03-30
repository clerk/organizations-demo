import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import MemberList from "../../components/MemberList";
import InvitationList from "../../components/InvitationList";
import BackendTest from "../../components/BackendTest";
import { useOrganizations, useUser } from "@clerk/nextjs";
import type { OrganizationMembershipResource } from "@clerk/types";
import { useEffect, useState } from "react";

export default function Organization() {
  const {
    query: { organizationId },
  } = useRouter();

  const [organizationMemberships, setOrganizationMemberships] = useState<
    OrganizationMembershipResource[]
  >([]);

  const { getOrganizationMemberships } = useOrganizations();

  useEffect(() => {
    async function fetchOrganizationMemberships() {
      try {
        const orgMemberships = await getOrganizationMemberships();
        setOrganizationMemberships(orgMemberships);
      } catch (err) {
        console.log(err);
      }
    }

    fetchOrganizationMemberships();
  }, [organizationId, getOrganizationMemberships]);

  const currentOrganizationMembership = organizationMemberships.find(
    (membership) => membership.organization.id === organizationId
  );

  if (!currentOrganizationMembership) {
    return null;
  }

  const isAdmin = currentOrganizationMembership.role === "admin";
  const currentOrganization = currentOrganizationMembership.organization;

  return (
    <div>
      <Head>
        <title>Clerk Organizations Demo</title>
      </Head>

      <h1>Organization: {currentOrganization.name}</h1>

      <MemberList
        isCurrentUserAdmin={isAdmin}
        organization={currentOrganization}
      />
      {isAdmin && <InvitationList organization={currentOrganization} />}

      <BackendTest />
    </div>
  );
}
