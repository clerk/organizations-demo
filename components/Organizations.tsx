import Link from "next/link";
import { useOrganizationList } from "@clerk/nextjs";

export default function Organizations() {
  const { organizationList } = useOrganizationList();

  if (!organizationList) {
    return null;
  }

  return (
    <div>
      <h2>Your organizations</h2>
      <ul>
        {organizationList.map(({ organization }) => (
          <Link
            key={organization.id}
            href={`/organizations/${organization.id}`}
          >
            {organization.name}
          </Link>
        ))}
      </ul>
    </div>
  );
}
