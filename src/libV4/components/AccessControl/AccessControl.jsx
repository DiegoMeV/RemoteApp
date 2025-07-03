import { usePrivileges } from '../../hooks'

const AccessControl = ({ privilege, children, nodeContent }) => {
  const hasPrivileges = usePrivileges(privilege)

  // If privilege is an empty string, it is assumed to have privileges.
  const shouldRenderChildren = privilege === '' || hasPrivileges

  if (!shouldRenderChildren) {
    return nodeContent ?? null
  }

  return <>{children}</>
}

export default AccessControl
