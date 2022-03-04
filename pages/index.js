import Head from "next/head";
import styles from "../styles/Page.module.css";

import { OrganizationListProvider } from "../components/OrganizationList";
import MyOrganizations from "../components/MyOrganizations";
import CreateOrganization from "../components/CreateOrganization";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Clerk Organizations Demo</title>
      </Head>
      <h1>Organization demo</h1>
      <MyOrganizations />
      <CreateOrganization />
    </div>
  );
}
