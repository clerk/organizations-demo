"use client"

import { useState, useCallback } from "react"

const useFetch = (path: string) => {
  const [state, setState] = useState<{ data: any; error: any } | null>(null)
  const request = useCallback(async () => {
    setState(null)
    try {
      /* Clerk already stores the active organization on the JWT claims */
      const res = await fetch(path)
      if (res.ok) {
        const data = await res.json()
        setState({
          data,
          error: null,
        })
      } else {
        setState({
          data: null,
          error: res.status,
        })
      }
    } catch (error) {
      setState({
        data: null,
        error,
      })
    }
  }, [setState])

  return { request, state }
}

export function EditorTest() {
  const { request, state } = useFetch(`/api/editor`)

  return (
    <div>
      <h2>Editor test</h2>
      <div>
        This should fail with 404 if user is not an editor
        <strong>/api/editor</strong>
      </div>
      <div>
        <button onClick={request}>Test</button>
      </div>
      {state?.data && <pre>{JSON.stringify(state.data, null, 2)}</pre>}
      {state?.error && <pre>{JSON.stringify(state.error, null, 2)}</pre>}
    </div>
  )
}

export function AuthTest() {
  const { request, state } = useFetch(`/api/authTest`)

  return (
    <div>
      <h2>Backend test</h2>
      <div>
        Read your user ID and role for this org from{" "}
        <strong>/api/testAuth</strong>
      </div>
      <div>
        <button onClick={request}>Test</button>
      </div>
      {state?.data && <pre>{JSON.stringify(state.data, null, 2)}</pre>}
    </div>
  )
}

export function AdminOrEditor() {
  const { request, state } = useFetch(`/api/admin-editor`)

  return (
    <div>
      <h2>Admin Or Editor test</h2>
      <div>
        This should fail with 403 if user is not an editor or editor
        <strong>/api/admin-editor</strong>
      </div>
      <div>
        <button onClick={request}>Test</button>
      </div>
      {state?.data && <pre>{JSON.stringify(state.data, null, 2)}</pre>}
      {state?.error && <pre>{JSON.stringify(state.error, null, 2)}</pre>}
    </div>
  )
}
