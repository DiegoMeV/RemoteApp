export const buildJobStatusUrl = (nameJob, identificador) => {
  return `/nomina/jobStatus/${nameJob}/${identificador}?camelCaseResponse=true`
}
