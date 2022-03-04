import type { OrganizationResource } from "@clerk/types";
import { useEffect, useState } from "react";
import { OrganizationMembershipResource } from "@clerk/types";

export default ({ organization }: { organization: OrganizationResource }) => {
  const [members, setMembers] = useState<
    null | OrganizationMembershipResource[]
  >(null);
  useEffect(() => {
    organization.getMembers().then((members) => {
      setMembers(members);
    });
  }, []);
  if (!members) {
    return null;
  }

  return (
    <div>
      <h2>Organization members</h2>
      <ul>
        {members.map((m) => (
          <li>
            {m.publicUserData.firstName} {m.publicUserData.lastName} &lt;
            {m.publicUserData.identifier}&gt;: {m.role}
          </li>
        ))}
      </ul>
    </div>
  );
};
