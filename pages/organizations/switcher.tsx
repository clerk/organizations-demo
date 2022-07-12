import Head from "next/head";
import MemberList from "../../components/MemberList";
import InvitationList from "../../components/InvitationList";
import BackendTest from "../../components/BackendTest";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Select from "react-select";
import { useRouter } from "next/router";

export default function Switcher() {
  const router = useRouter();
  const { setActive, organizationList, isLoaded } = useOrganizationList();
  const { organization, ...rest } = useOrganization();

  if (!isLoaded) {
    return null;
  }

  if (router.query.selected) {
    router.replace("/organizations/switcher", undefined, { shallow: true });
    setActive({ organization: router.query.selected as string });
  }

  const handleOrgChange = (e) => {
    setActive({ organization: e.value });
  };

  if (!organization) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>Clerk Organizations Demo</title>
      </Head>
      <div style={{ width: 250, float: "right" }}>
        <Select
          options={createOrganizationOptions(organizationList)}
          onChange={handleOrgChange}
          value={{ value: organization.id, label: organization.name }}
        />
      </div>
      <OrganizationInfo />
    </div>
  );
}

function OrganizationInfo() {
  const {
    organization: currentOrganization,
    membership,
    isLoaded,
  } = useOrganization();

  if (!isLoaded || !currentOrganization) {
    return null;
  }

  const isAdmin = membership.role === "admin";
  return (
    <>
      <h1>Organization: {currentOrganization.name}</h1>
      <MemberList />
      {isAdmin && <InvitationList />}
      <BackendTest />
    </>
  );
}

function createOrganizationOptions(organizationList) {
  return organizationList.map(({ organization }) => ({
    value: organization.id,
    label: organization.name,
  }));
}
