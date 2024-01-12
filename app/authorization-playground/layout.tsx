import { PropsWithChildren } from "react"
import { OrganizationList } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"

export default function AuthorizationPlaygroundLayout(
  props: PropsWithChildren
) {
  const { orgId, has } = auth().protect({ redirectUrl: "/sign-in" })

  if (!orgId) {
    return (
      <div className=" flex h-full w-full flex-col gap-5">
        <section className="col-span-2 m-auto flex w-full max-w-lg items-center justify-center space-y-6 pt-6">
          <div className="space-y-4">
            <h1>Welcome</h1>
            <p className="text-sm">
              This part of the application requires the user to select an
              organization in order to proceed. If you are not part of an
              organization, you can accept an invitation or create your own
              organization
            </p>
            <OrganizationList hidePersonal={true} skipInvitationScreen={true} />
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col gap-5">
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
          href={"/authorization-playground"}
          className="inline-block px-4 py-1 hover:bg-slate-100"
        >
          Posts
        </Link>

        <Link
          href={"/authorization-playground/settings"}
          className="inline-block px-4 py-1 hover:bg-slate-100 aria-disabled:pointer-events-none aria-disabled:bg-zinc-100 aria-disabled:text-zinc-500"
          aria-disabled={!has({ permission: "org:posts:manage" })}
        >
          Settings
        </Link>
      </nav>
      {props.children}
    </div>
  )
}
