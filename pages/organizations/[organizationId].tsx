import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import MemberList from "../../components/MemberList";
import InvitationList from "../../components/InvitationList";
import BackendTest from "../../components/BackendTest";
import { useOrganizations } from "@clerk/nextjs";
import type { OrganizationResource } from "@clerk/types";
import { useEffect, useState } from "react";

export default function Organization() {
  const { query } = useRouter();

  const [organization, setOrganization] = useState<null | OrganizationResource>(
    null
  );

  const { getOrganization } = useOrganizations();
  useEffect(() => {
    getOrganization(query.organizationId as string).then((o) =>
      setOrganization(o)
    );
  }, [getOrganization, setOrganization, query.organizationId]);

  if (organization === null) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>Clerk Organizations Demo</title>
      </Head>

      <h1>Organization: {organization.name}</h1>

      <MemberList organization={organization} />
      {organization.role === "admin" && (
        <InvitationList organization={organization} />
      )}

      <BackendTest />
    </div>
  );
}
