import type { MembershipRole, OrganizationResource } from "@clerk/types";
import { useCallback, useEffect, useState } from "react";
import { OrganizationMembershipResource } from "@clerk/types";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function MemberList({
  organization,
  isCurrentUserAdmin,
}: {
  organization: OrganizationResource;
  isCurrentUserAdmin: boolean;
}) {
  const [memberships, setMemberships] = useState<
    null | OrganizationMembershipResource[]
  >(null);

  const refreshList = useCallback(() => {
    return organization.getMemberships().then((memberships) => {
      setMemberships(memberships);
    });
  }, [organization.getMemberships, setMemberships]);

  useEffect(() => {
    refreshList();
  }, []);

  if (!memberships) {
    return null;
  }

  return (
    <div>
      <h2>Organization members</h2>
      <ul>
        {memberships.map((m) => (
          <li key={m.id}>
            {m.publicUserData.firstName} {m.publicUserData.lastName} &lt;
            {m.publicUserData.identifier}&gt; :: {m.role}
            {isCurrentUserAdmin && (
              <AdminControls refreshList={refreshList} membership={m} />
            )}
            <SelfAdminControls membership={m} memberships={memberships} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const AdminControls = ({
  membership,
  refreshList,
}: {
  membership: OrganizationMembershipResource;
  refreshList: () => Promise<void>;
}) => {
  const [disabled, setDisabled] = useState(false);
  const { id: userId } = useUser();

  if (membership.publicUserData.userId === userId) {
    return null;
  }

  const remove = async () => {
    setDisabled(true);
    await membership.destroy();
    await refreshList();
  };

  const changeRole = async (role: MembershipRole) => {
    setDisabled(true);
    await membership.update({ role });
    await refreshList();
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
