import { useState, useCallback } from "react";
import { useRouter } from "next/router";

export default () => {
  const [data, setData] = useState<any>(null);
  const { query } = useRouter();
  const { organizationId } = query;

  const test = useCallback(async () => {
    setData(null);
    const res = await fetch(`/api/authTest?organizationId=${organizationId}`);
    const data = await res.json();
    setData(data);
  }, [setData, organizationId]);

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
};
