import Link from "next/link"

export const metadata = {
  title: "Homepage",
}

export default function DashboardPage() {
  return (
    <main className={"col-span-2 space-y-6 pt-6"}>
      <ul>
        <li>
          <Link href="/discover">Discover Organizations</Link>
        </li>
        <li>
          <Link href="/organization">Organization Profile</Link>
        </li>
        <li>
          <Link href="/create-organization">Create Organization</Link>
        </li>
        <li>
          <Link href="/switcher">Switcher</Link>
        </li>
        <li>
          <Link href="/app">App with posts</Link>
        </li>
      </ul>
    </main>
  )
}
