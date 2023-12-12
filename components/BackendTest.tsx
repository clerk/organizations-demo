import { useState, useCallback } from "react"

export default function BackendTest() {
  //   TODO: Find a usecase for this
  const [data, setData] = useState<any>(null)

  const test = useCallback(async () => {
    setData(null)
    /* Clerk already stores the active organization on the JWT claims */
    const res = await fetch(`/api/authTest`)
    const data = await res.json()
    setData(data)
  }, [setData])

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
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
