import { useOrganizationList } from "@clerk/nextjs";
import { FormEventHandler, useState } from "react";

export default function CreateOrganization() {
  const { createOrganization } = useOrganizationList();
  const [organizationName, setOrganizationName] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createOrganization({ name: organizationName });
    setOrganizationName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="organizationName"
        value={organizationName}
        onChange={(e) => setOrganizationName(e.currentTarget.value)}
      />
      <button type="submit">Create organization</button>
    </form>
  );
}
