import type { OrganizationResource } from "@clerk/types";
import { useEffect, useState } from "react";
import { OrganizationMembershipResource } from "@clerk/types";

export default ({ organization }: { organization: OrganizationResource }) => {
  const [memberships, setMemberships] = useState<
    null | OrganizationMembershipResource[]
  >(null);
  useEffect(() => {
    organization.getMemberships().then((memberships) => {
      setMemberships(memberships);
    });
  }, []);
  if (!memberships) {
    return null;
  }

  return (
    <div>
      <h2>Organization members</h2>
      <ul>
        {memberships.map((m) => (
          <li>
            {m.publicUserData.firstName} {m.publicUserData.lastName} &lt;
            {m.publicUserData.identifier}&gt;: {m.role}
          </li>
        ))}
      </ul>
    </div>
  );
};
