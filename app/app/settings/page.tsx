import { OrganizationProfile, auth } from "@clerk/nextjs"

export default function CreateOrganizationPage() {
  auth().protect({ role: "admin" })
  return (
    <main
      className={
        "col-span-2 flex h-full w-full items-center justify-center space-y-6 pt-6"
      }
    >
      <div className={"flex w-full max-w-3xl flex-col gap-4"}>
        <h1>Settings</h1>
        <h2>Clerk Organization Settings</h2>
        <OrganizationProfile
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "w-full",
            },
          }}
        />

        <h2>Post Organization Settings</h2>
        {/*<Experimental__Gate*/}
        {/*  permission="org:posts:read"*/}
        {/*  fallback={<p>Access not granted</p>}*/}
        {/*>*/}
        {/*  <Posts />*/}
        {/*</Experimental__Gate>*/}
      </div>
    </main>
  )
}
