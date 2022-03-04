import Head from "next/head";

import OrganizationList from "../components/OrganizationList";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Clerk Organizations Demo</title>
      </Head>
      <h1>Organization demo</h1>
      <OrganizationList />
    </div>
  );
}
