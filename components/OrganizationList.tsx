import React from "react";
import { useOrganizations } from "@clerk/nextjs";
import type { OrganizationResource } from "@clerk/types";

const OrganizationListCtx = React.createContext<{
  organizations: null | OrganizationResource[];
  refresh: () => Promise<void>;
}>({ organizations: null, refresh: () => Promise.reject() });

export const useOrganizationList = () => {
  const ctx = React.useContext(OrganizationListCtx);
  if (ctx.organizations === null) {
    return { loading: true, organizations: [] };
  }
  return { loading: false, organizations: ctx.organizations };
};

export const useRefreshOrganizationList = () => {
  const ctx = React.useContext(OrganizationListCtx);
  return ctx.refresh;
};

export const OrganizationListProvider = ({ children }) => {
  const { getOrganizations } = useOrganizations();
  const [organizations, setOrganizations] = React.useState<
    null | OrganizationResource[]
  >(null);

  const refresh = React.useCallback(() => {
    return getOrganizations().then((x) => setOrganizations(x));
  }, [getOrganizations, setOrganizations]);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <OrganizationListCtx.Provider value={{ organizations, refresh }}>
      {children}
    </OrganizationListCtx.Provider>
  );
};
