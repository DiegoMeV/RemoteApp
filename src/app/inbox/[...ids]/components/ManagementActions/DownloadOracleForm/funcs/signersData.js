export const signersDataOracle = (signers) => {
  const jobTitlesWithUserInfo = {
    count: signers?.count,
    data: signers?.data?.flatMap((user) => {
      if (user?.jobTitles) {
        return user.jobTitles.map((jobTitle) => {
          return {
            jobTitles: jobTitle || {},
            idUser: user.id ?? '',
            id: jobTitle?.id ?? '',
            email: user.email ?? '',
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
            aliases: user.aliases ?? '',
          }
        })
      } else {
        return []
      }
    }),
  }
  return jobTitlesWithUserInfo
}
