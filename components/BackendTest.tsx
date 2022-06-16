import { useState, useCallback } from "react";
import { useOrganization } from "@clerk/nextjs";

export default function BackendTest() {
  const [data, setData] = useState<any>(null);
  const { organization } = useOrganization();

  const test = useCallback(async () => {
    setData(null);
    const res = await fetch(`/api/authTest?organizationId=${organization.id}`);
    const data = await res.json();
    setData(data);
  }, [setData, organization.id]);

  return (
    <div>
      <h2>Backend test</h2>
      <div>
        Read your user ID and role for this org from{" "}
        <strong>/api/testAuth</strong>
      </div>
      <div>
        <button onClick={test}>Test</button>
      </div>
      {data && <pre>{JSON.stringify(data, "", 2)}</pre>}
    </div>
  );
}
