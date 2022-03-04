import type { OrganizationResource } from "@clerk/types";
import { useCallback, useEffect, useState } from "react";
import { OrganizationMembershipResource } from "@clerk/types";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default ({ organization }: { organization: OrganizationResource }) => {
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
            <AdminControls
              refreshList={refreshList}
              organization={organization}
              membership={m}
            />
            <SelfAdminControls membership={m} memberships={memberships} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const AdminControls = ({
  organization,
  membership,
  refreshList,
}: {
  organization: OrganizationResource;
  membership: OrganizationMembershipResource;
  refreshList: () => Promise<void>;
}) => {
  const [disabled, setDisabled] = useState(false);
  const { id: userId } = useUser();

  if (organization.role !== "admin") {
    return null;
  }

  if (membership.publicUserData.userId === userId) {
    return null;
  }

  const remove = async () => {
    setDisabled(true);
    await membership.destroy();
    await refreshList();
  };

  const changeToAdmin = async () => {
    setDisabled(true);
    await membership.update({ role: "admin" });
    await refreshList();
    setDisabled(false);
  };

  const changeToMember = async () => {
    setDisabled(true);
    await membership.update({ role: "basic_member" });
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
        <button disabled={disabled} onClick={changeToMember}>
          Change to member
        </button>
      ) : (
        <button disabled={disabled} onClick={changeToAdmin}>
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
  organization: OrganizationResource;
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
