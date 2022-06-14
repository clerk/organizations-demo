import { useCallback, useEffect, useState } from "react";
import type { OrganizationMembershipResource } from "@clerk/types";
import { useOrganizationList, useOrganizations } from "@clerk/nextjs";
import Link from "next/link";

const OrganizationList = () => {
  const { organizationList, isLoaded } = useOrganizationList();
  if (!isLoaded) {
    return null;
  }

  return (
    <div>
      <h2>Create organization</h2>
      {/* <CreateOrganization refreshList={() => ({})} /> */}

      <h2>Your organizations</h2>
      {organizationList.length === 0 ? (
        <div>You don't belong to any organizations yet.</div>
      ) : (
        <ul>
          {organizationList.map(({ organization }) => (
            <li key={organization.id}>
              <Link href={`/organizations/${organization.id}`}>
                <a>{organization.name}</a>
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
