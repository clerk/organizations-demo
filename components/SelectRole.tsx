import { ChangeEventHandler, useEffect, useRef, useState } from "react"
import { OrganizationCustomRoleKey } from "@clerk/types"
import { useOrganization } from "@clerk/nextjs"

type SelectRoleProps = {
  fieldName?: string
  isDisabled?: boolean
  onChange?: ChangeEventHandler<HTMLSelectElement>
  defaultRole?: string
}

export const SelectRole = ({
  fieldName,
  isDisabled = false,
  onChange,
  defaultRole,
}: SelectRoleProps) => {
  const { organization } = useOrganization()
  const [fetchedRoles, setRoles] = useState<OrganizationCustomRoleKey[]>([])
  const isPopulated = useRef(false)

  useEffect(() => {
    if (isPopulated.current) return
    organization
      ?.getRoles({
        pageSize: 20,
        initialPage: 1,
      })
      .then((res) => {
        isPopulated.current = true
        setRoles(
          res.data.map((roles) => roles.key as OrganizationCustomRoleKey)
        )
      })
  }, [organization?.id])

  if (fetchedRoles.length === 0) return null

  return (
    <select
      name={fieldName}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      onChange={onChange}
      defaultValue={defaultRole}
    >
      {fetchedRoles?.map((roleKey) => (
        <option key={roleKey} value={roleKey}>
          {roleKey}
        </option>
      ))}
    </select>
  )
}
