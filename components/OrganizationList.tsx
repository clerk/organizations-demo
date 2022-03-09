import { useCallback, useEffect, useState } from "react";
import type {
  OrganizationMembershipResource,
  OrganizationResource,
} from "@clerk/types";
import { useOrganizations } from "@clerk/nextjs";
import Link from "next/link";

const OrganizationList = ({
  organization,
}: {
  organization: OrganizationResource;
}) => {
  const { getOrganizationMemberships } = useOrganizations();
  const [organizationMemberships, setOrganizationMemberships] = useState<
    null | OrganizationMembershipResource[]
  >(null);

  const refreshList = useCallback(() => {
    return getOrganizationMemberships().then((organizationMemberships) =>
      setOrganizationMemberships(organizationMemberships)
    );
  }, [getOrganizationMemberships, setOrganizationMemberships]);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  if (!organizationMemberships) {
    return null;
  }

  return (
    <div>
      <h2>Create organization</h2>
      <CreateOrganization refreshList={refreshList} />

      <h2>Your organizations</h2>
      {organizationMemberships.length === 0 ? (
        <div>You don't belong to any organizations yet.</div>
      ) : (
        <ul>
          {organizationMemberships.map((o) => (
            <li key={o.id}>
              <Link href={`/organizations/${o.organization.id}`}>
                <a>{o.organization.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const CreateOrganization = ({
  refreshList,
}: {
  refreshList: () => Promise<void>;
}) => {
  const { createOrganization } = useOrganizations();

  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    await createOrganization({ name: name });
    await refreshList();
    setName("");
    setDisabled(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" disabled={disabled}>
        Create
      </button>
    </form>
  );
};

export default OrganizationList;
