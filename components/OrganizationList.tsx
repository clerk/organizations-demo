import { useCallback, useEffect, useState } from "react";
import type { OrganizationResource } from "@clerk/types";
import { useOrganizations } from "@clerk/nextjs";
import Link from "next/link";

export default ({ organization }: { organization: OrganizationResource }) => {
  const { getOrganizations } = useOrganizations();
  const [organizations, setOrganizations] = useState<
    null | OrganizationResource[]
  >(null);

  const refreshList = useCallback(() => {
    return getOrganizations().then((x) => setOrganizations(x));
  }, [getOrganizations, setOrganizations]);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  if (!organizations) {
    return null;
  }

  return (
    <div>
      <h2>Create organization</h2>
      <CreateOrganization refreshList={refreshList} />

      <h2>Your organizations</h2>
      {organizations.length === 0 ? (
        <div>You don't belong to any organizations yet.</div>
      ) : (
        <ul>
          {organizations.map((o) => (
            <li key={o.id}>
              <Link href={`/organizations/${o.id}`}>
                <a>{o.name}</a>
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
