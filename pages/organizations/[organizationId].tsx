import Head from "next/head";
import { useRouter } from "next/router";
import MemberList from "../../components/MemberList";
import InvitationList from "../../components/InvitationList";
import BackendTest from "../../components/BackendTest";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Organization() {
  const {
    query: { organizationId },
  } = useRouter();

  const { setActive } = useOrganizationList();

  const {
    organization: currentOrganization,
    membership,
    isLoaded,
  } = useOrganization();

  currentOrganization &&
    organizationId !== currentOrganization.id &&
    setActive({ organization: organizationId as string });

  if (
    !isLoaded ||
    !currentOrganization
    // currentOrganization.id !== organizationId
  ) {
    return null;
  }

  const isAdmin = membership.role === "admin";

  return (
    <div>
      <Head>
        <title>Clerk Organizations Demo</title>
      </Head>

      <h1>Organization: {currentOrganization.name}</h1>

      <MemberList />
      {isAdmin && <InvitationList />}

      <BackendTest />
    </div>
  );
}
