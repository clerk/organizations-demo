import { useState } from "react";
import { useOrganization } from "@clerk/nextjs";

export default function InvitationList() {
  const { invitationList } = useOrganization({ invitationList: {} });

  if (!invitationList) {
    return null;
  }

  const revoke = async (inv) => {
    await inv.revoke();
  };

  return (
    <div>
      <h2>Invite member</h2>
      <InviteMember />

      <h2>Pending invitations</h2>
      <ul>
        {invitationList.map((i) => (
          <li key={i.id}>
            {i.emailAddress} <button onClick={() => revoke(i)}>Revoke</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const InviteMember = () => {
  const { organization } = useOrganization();
  const [emailAddress, setEmailAddress] = useState("");
  const [role, setRole] = useState<"basic_member" | "admin">("basic_member");
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    await organization.inviteMember({ emailAddress, role });
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
          onChange={() => {
            setRole("admin");
          }}
        />{" "}
        Admin
      </label>
      <label>
        <input
          type="radio"
          checked={role === "basic_member"}
          onChange={() => {
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
