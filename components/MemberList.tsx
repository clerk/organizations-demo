import type {
  MembershipRole,
  OrganizationMembershipResource,
} from "@clerk/types";
import { useState } from "react";
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
            <SelfAdminControls membership={m} />
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
}: {
  membership: OrganizationMembershipResource;
}) => {
  const { push } = useRouter();
  const [disabled, setDisabled] = useState(false);
  const {
    user: { id: userId },
    isLoaded,
  } = useUser();
  const { membershipList } = useOrganization({
    membershipList: {},
  });

  if (membership.publicUserData.userId !== userId || !isLoaded) {
    return null;
  }

  // User can only leave the org if they are not an admin, or
  // if there's at least one other admin
  const canLeave =
    membership.role !== "admin" ||
    membershipList.findIndex(
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
