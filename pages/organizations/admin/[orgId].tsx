import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { organizations } from "@clerk/nextjs/api";

const OrganizationAdmin = ({
  organizationName,
}: {
  organizationName: string;
}) => {
  return <p>Admin page for: {organizationName}</p>;
};

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl, query }) => {
    const { sessionId, claims } = req.auth;

    /** If the user is not signed in, redirect him to the sign in page. */
    if (!sessionId) {
      return {
        redirect: { destination: "/sign-in?redirect_url=" + resolvedUrl },
        props: {},
      };
    }

    const isCurrentOrganizationAdmin =
      claims.org_id === query.orgId && claims.org_role === "admin";

    /** If the user's current organization role is not an admin, redirect them home. */
    if (!isCurrentOrganizationAdmin) {
      return {
        redirect: { destination: "/" },
        props: {},
      };
    }

    /** Query the Node.js backend API to retrieve any organization information for the SSR step.  */
    const organization = await organizations.getOrganization({
      organizationId: claims.org_id as string,
    });

    return {
      props: { organizationName: organization.name },
    };
  }
);

export default OrganizationAdmin;
