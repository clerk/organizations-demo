import React from "react";
import type { OrganizationResource } from "@clerk/types";
import { useRefreshOrganizationList } from "./OrganizationList";

export default ({ organization }: { organization: OrganizationResource }) => {
  const [emailAddress, setEmailAddress] = React.useState("");
  const [role, setRole] = React.useState<"basic_member" | "admin">(
    "basic_member"
  );
  const [disabled, setDisabled] = React.useState(false);
  const refreshList = useRefreshOrganizationList();

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    await organization.inviteMember({ emailAddress, role });
    setEmailAddress("");
    setRole("basic_member");
    setDisabled(false);
  };

  return (
    <div>
      <h2>Invite member</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email address"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <label>
          <input
            type="radio"
            checked={role === "admin"}
            onClick={() => {
              setRole("admin");
            }}
          />{" "}
          Admin
        </label>
        <label>
          <input
            type="radio"
            checked={role === "basic_member"}
            onClick={() => {
              setRole("basic_member");
            }}
          />{" "}
          Member
        </label>{" "}
        <button type="submit" disabled={disabled}>
          Invite
        </button>
      </form>
    </div>
  );
};
