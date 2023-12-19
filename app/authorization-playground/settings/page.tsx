import { ClerkLoading, OrganizationProfile, auth } from "@clerk/nextjs"

export default function CustomAppSettings() {
  auth().protect({
    permission: "org:posts:manage",
  })
  return (
    <main
      className={
        "col-span-2 flex h-full w-full items-center justify-center space-y-6 pt-6"
      }
    >
      <div className={"flex w-full max-w-3xl flex-col gap-4"}>
        <h1>Settings</h1>
        <h2>Clerk Organization Settings</h2>
        <ClerkLoading>Loading ...</ClerkLoading>
        <OrganizationProfile
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "w-full",
            },
          }}
        />

        {/*TODO: Add role checks as well*/}

        <h2>Post Organization Settings</h2>
        {/*TODO: Add a fake form*/}
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
