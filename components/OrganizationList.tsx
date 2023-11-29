import { useOrganizationList } from "@clerk/nextjs"
import Link from "next/link"

const OrganizationList = () => {
  // const { organizationList, isLoaded } = useOrganizationList();
  // if (!isLoaded) {
  //   return null;
  // }

  return null
  // <div>
  //   <h2>Your organizations</h2>
  //   {organizationList.length === 0 ? (
  //     <div>You do not belong to any organizations yet.</div>
  //   ) : (
  //     <ul>
  //       {organizationList.map(({ organization }) => (
  //         <li key={organization.id}>
  //           <Link
  //             href={`/organizations/switcher?selected=${organization.id}`}
  //           >
  //             <a>{organization.name}</a>
  //           </Link>
  //         </li>
  //       ))}
  //     </ul>
  //   )}
  // </div>
}

export default OrganizationList
