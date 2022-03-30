import { useCallback, useEffect, useState } from "react";
import type {
  OrganizationResource,
  OrganizationInvitationResource,
} from "@clerk/types";

export default function InvitationList({
  organization,
}: {
  organization: OrganizationResource;
}) {
  const [invitations, setInvitations] = useState<
    null | OrganizationInvitationResource[]
  >(null);

  const refreshList = useCallback(() => {
    return organization.getPendingInvitations().then((invitations) => {
      setInvitations(invitations);
    });
  }, [organization.getPendingInvitations, setInvitations]);

  useEffect(() => {
    refreshList();
  }, []);

  if (!invitations) {
    return null;
  }

  const revoke = async (inv) => {
    await inv.revoke();
    await refreshList();
  };

  return (
    <div>
      <h2>Invite member</h2>
      <InviteMember organization={organization} refreshList={refreshList} />

      <h2>Pending invitations</h2>
      <ul>
        {invitations.map((i) => (
          <li key={i.id}>
            {i.emailAddress} <button onClick={() => revoke(i)}>Revoke</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const InviteMember = ({
  organization,
  refreshList,
}: {
  organization: OrganizationResource;
  refreshList: () => Promise<void>;
}) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [role, setRole] = useState<"basic_member" | "admin">("basic_member");
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    await organization.inviteMember({ emailAddress, role });
    await refreshList();
    setEmailAddress("");
    setRole("basic_member");
    setDisabled(false);
  };

  return (
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
  );
};
