import Link from "next/link"

export const metadata = {
  title: "Homepage",
}

export default function DashboardPage() {
  return (
    <main className={"col-span-2 m-auto w-full max-w-lg space-y-6 pt-6"}>
      <Link
        href="/authorization-playground"
        className="block w-full rounded border p-5 text-center text-2xl font-bold shadow"
      >
        Authorization with Custom UI
      </Link>
      <ul className="grid grid-cols-2 gap-3">
        <li>
          <Link
            href="/discover"
            className="block rounded border p-5 text-center text-lg font-medium shadow"
          >
            Discover Organizations
          </Link>
        </li>
        <li>
          <Link
            href="/organization"
            className="block rounded border p-5 text-center text-lg font-medium shadow"
          >
            Organization Profile
          </Link>
        </li>
        <li>
          <Link
            href="/create-organization"
            className="block rounded border p-5 text-center text-lg font-medium shadow"
          >
            Create Organization
          </Link>
        </li>
      </ul>
    </main>
  )
}
