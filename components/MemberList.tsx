import type { MembershipRole } from "@clerk/types";
import { useState } from "react";
import { OrganizationMembershipResource } from "@clerk/types";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function MemberList() {
  const { membershipList, membership } = useOrganization({
    membershipList: {},
  });

  if (!membershipList) {
    return null;
  }

  const isCurrentUserAdmin = membership.role === "admin";

  return (
    <div>
      <h2>Organization members</h2>
      <ul>
        {membershipList.map((m) => (
          <li key={m.id}>
            {m.publicUserData.firstName} {m.publicUserData.lastName} &lt;
            {m.publicUserData.identifier}&gt; :: {m.role}
            {isCurrentUserAdmin && <AdminControls membership={m} />}
            {/* <SelfAdminControls membership={m} memberships={memberships} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

const AdminControls = ({
  membership,
}: {
  membership: OrganizationMembershipResource;
}) => {
  const [disabled, setDisabled] = useState(false);
  const {
    user: { id: userId },
  } = useUser();

  if (membership.publicUserData.userId === userId) {
    return null;
  }

  const remove = async () => {
    setDisabled(true);
    await membership.destroy();
  };

  const changeRole = async (role: MembershipRole) => {
    setDisabled(true);
    await membership.update({ role });
    setDisabled(false);
  };

  return (
    <>
      ::{" "}
      <button disabled={disabled} onClick={remove}>
        Remove member
      </button>{" "}
      {membership.role === "admin" ? (
        <button disabled={disabled} onClick={() => changeRole("basic_member")}>
          Change to member
        </button>
      ) : (
        <button disabled={disabled} onClick={() => changeRole("admin")}>
          Change to admin
        </button>
      )}
    </>
  );
};

const SelfAdminControls = ({
  membership,
  memberships,
}: {
  membership: OrganizationMembershipResource;
  memberships: OrganizationMembershipResource[];
}) => {
  const { push } = useRouter();
  const [disabled, setDisabled] = useState(false);
  const { id: userId } = useUser();

  if (membership.publicUserData.userId !== userId) {
    return null;
  }

  // User can only leave the org if they are not an admin, or
  // if there's at least one other admin
  const canLeave =
    membership.role !== "admin" ||
    memberships.findIndex(
      (x) => x.id !== membership.id && x.role === "admin"
    ) !== -1;

  if (!canLeave) {
    return null;
  }

  const leave = async () => {
    setDisabled(true);
    await membership.destroy();
    push("/");
  };

  return (
    <>
      ::{" "}
      <button disabled={disabled} onClick={leave}>
        Leave organization
      </button>
    </>
  );
};
