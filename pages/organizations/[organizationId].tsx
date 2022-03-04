import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Page.module.css";
import { useOrganizationList } from "../../components/OrganizationList";
import MemberList from "../../components/MemberList";
import InviteMember from "../../components/InviteMember";

export default function Organization() {
  const { query } = useRouter();

  const { loading, organizations } = useOrganizationList();
  if (loading) {
    return null;
  }

  const org = organizations.find((x) => x.id === query.organizationId);
  if (!org) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Clerk Organizations Demo</title>
      </Head>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <h1>Organization: {org.name}</h1>

      <MemberList organization={org} />
      {org.role === "admin" && <InviteMember organization={org} />}
    </div>
  );
}
