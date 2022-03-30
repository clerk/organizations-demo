import { useState, useEffect } from "react";
import Link from "next/link";
import { useOrganizations } from "@clerk/nextjs";
import { OrganizationMembershipResource } from "@clerk/types";

// Lists all organization the user is a member of.
// Each entry is a link to a page to manage organization
// members.
export default function Organizations() {
  const [organizationMemberships, setOrganizationMemberships] = useState<
    OrganizationMembershipResource[]
  >([]);

  const { getOrganizationMemberships } = useOrganizations();

  useEffect(() => {
    async function fetchOrganizationMemberships() {
      try {
        const orgs = await getOrganizationMemberships();
        setOrganizationMemberships(orgs);
      } catch (err) {
        console.error(err);
      }
    }

    fetchOrganizationMemberships();
  }, []);

  return (
    <div>
      <h2>Your organizations</h2>
      <ul>
        {organizationMemberships.map(({ organization }) => (
          <Link
            key={organization.id}
            href={`/organizations/${organization.id}`}
          >
            {organization.name}
          </Link>
        ))}
      </ul>
    </div>
  );
}
