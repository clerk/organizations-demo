import { auth, OrganizationList } from "@clerk/nextjs"
import { PropsWithChildren } from "react"

export const RequireActiveOrganization = (props: PropsWithChildren) => {
  const { orgId } = auth()

  if (orgId) {
    return props.children
  }
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
          <OrganizationList hidePersonal={true} />
        </div>
      </section>
    </div>
  )
}
