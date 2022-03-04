import { useOrganizationList } from "./OrganizationList";
import React from "react";
import Link from "next/link";

export default () => {
  const { loading, organizations } = useOrganizationList();
  if (loading) {
    return null;
  }

  const view =
    organizations.length === 0 ? (
      <div>You don't have any organizations yet.</div>
    ) : (
      <ul>
        {organizations.map((o) => (
          <li>
            <Link href={`/organizations/${o.id}`}>
              <a>{o.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    );

  return (
    <div>
      <h2>Your Organizations</h2>
      {view}
    </div>
  );
};
