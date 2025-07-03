export const handleDownloadReport = async (
  setPreviewer,
  callOracleReport,
  reportName,
  queryParams,
  nameShowModal
) => {
  const response = await callOracleReport({
    qry: `/${reportName}?${queryParams}&returnUrl=true`,
  })
  if (response?.url) {
    setPreviewer({
      open: true,
      url: response?.url,
      nameFile: nameShowModal ?? null,
    })
  }
}
