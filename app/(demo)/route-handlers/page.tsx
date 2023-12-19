import {
  AdminOrEditor,
  AuthTest,
  EditorTest,
} from "@/components/endpoint-tests"

export default function RouteHandlersPage() {
  return (
    <main className={"flex h-full w-full items-center justify-center"}>
      <div className={"flex flex-col pb-12"}>
        <h1 className="mb-6 mt-12">Route Handlers</h1>
        <div className={"flex flex-col gap-6"}>
          <AuthTest />
          <EditorTest />
          <AdminOrEditor />
        </div>
      </div>
    </main>
  )
}
