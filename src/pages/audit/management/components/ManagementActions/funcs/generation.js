export const generateRowsSigners = ({ signersRows }) => {
  return signersRows?.map((signer) => {
    return {
      id: signer?.id ?? '',
      name: `${signer?.firstName ?? ''} ${signer?.lastName ?? ''}`,
      jobtitles: signer?.jobTitles?.name ?? '',
      dependency: signer?.jobTitles?.depencyName ?? '',
    }
  })
}

export const signersData = (signers) => {
  const jobTitlesWithUserInfo = signers?.flatMap((user) => {
    if (user?.jobTitles) {
      return user.jobTitles.map((jobTitle) => {
        return {
          jobTitles: jobTitle || {},
          idUser: user.id ?? '',
          id: jobTitle?.id ?? '',
          email: user.email ?? '',
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
          cellPhone: user.cellPhone ?? '',
          isActive: user.isActive ?? '',
        }
      })
    } else {
      return []
    }
  })
  return jobTitlesWithUserInfo
}

export const userSigedoc = (users) => {
  const usersSigedocFormatted = users?.map((user) => {
    return {
      id: user?.identificacion ?? '',
      firstName: user?.nombre ?? '',
      lastName: user?.apellidos ?? '',
      email: user?.correo ?? '',
    }
  })
  return usersSigedocFormatted ?? []
}
