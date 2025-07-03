// We define a custom hook usePrivileges that accepts requiredPrivileges as an argument.

import { useStoreState } from 'easy-peasy'

// This hook will be used to check if the user has certain privileges.
const usePrivileges = (requiredPrivileges) => {
  const userData = useStoreState((state) => state.user.userData)

  // Extraemos el SID de los privilegios del usuario de userData.
  // We extract the SID of the user's privileges from userData.
  const userPrivilegesSid = userData?.privileges // User privileges sid

  // We check if the SID of the user's privileges includes the required privileges.
  // Returns true if it has them, or false otherwise.
  // This is an effective method to control access to certain functionalities in the application.
  return userPrivilegesSid?.includes(requiredPrivileges) // Returns true or false depending on whether the user has the required privileges.
}
export default usePrivileges
