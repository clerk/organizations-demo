import { PropsWithChildren } from "react"
import { auth, OrganizationList } from "@clerk/nextjs"
import Link from "next/link"

export default function RealAppLayout(props: PropsWithChildren) {
  const { orgId } = auth()

  if (!orgId) {
    return (
      <div className="space-y-4">
        <h1>You have not selected an organization</h1>
        <OrganizationList />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <section className="m-auto w-full max-w-lg rounded-md border bg-amber-100 p-2">
        <p>
          This is a dummy app which mimics a content management platform and
          allows users within the organization to create posts.
        </p>

        <p className="mt-2 text-sm font-semibold">
          Visit this page with different roles in order to see how the layout
          changes.
        </p>
        <p className="mt-2 text-sm font-semibold">
          Supported roles for this app are &quot;Editor&quot;,
          &quot;Admin&quot;, &quot;Viewer&quot;.
        </p>
      </section>
      <nav className="m-auto w-full max-w-lg rounded border">
        <Link
          href={"/app"}
          className="inline-block px-4 py-1 hover:bg-slate-100"
        >
          Posts
        </Link>
        <Link
          href={"/app/settings"}
          className="inline-block px-4 py-1 hover:bg-slate-100"
        >
          Settings
        </Link>
      </nav>
      {props.children}
    </div>
  )
}
