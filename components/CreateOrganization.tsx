import React from "react";
import { useOrganizations } from "@clerk/nextjs";
import { useRefreshOrganizationList } from "./OrganizationList";

export default () => {
  const [name, setName] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const refreshList = useRefreshOrganizationList();
  const { createOrganization } = useOrganizations();

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    await createOrganization({ name: name });
    await refreshList();
    setName("");
    setDisabled(false);
  };

  return (
    <div>
      <h2>Create Organization</h2>
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
    </div>
  );
};
