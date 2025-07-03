import { useMutationDynamicBaseUrl } from '@/libV4'
import toast from 'react-hot-toast'

export const useCallMultipleOracleReports = ({ reportNames = [], queryParams }) => {
  const { mutateAsync: callOracleReport } = useMutationDynamicBaseUrl({
    url: `/app-specific/siif-web/call-oracle-report`,
    baseKey: 'urlApps',
    method: 'get',
    isCompanyRequest: true,
  })

  const handleCallMultipleOracleReports = async () => {
    const windows = reportNames.map(() => window.open('', '_blank'))

    for (let i = 0; i < reportNames.length; i++) {
      const reportName = reportNames[i]
      const win = windows[i]

      try {
        const response = await callOracleReport({
          qry: `/${reportName}?${queryParams}&returnUrl=true`,
        })

        if (response?.url) {
          win.location.href = response.url
        } else {
          throw new Error('URL no encontrada')
        }
      } catch (error) {
        win.close()
        toast.error(
          `Error al generar el reporte ${reportName}: ${
            error?.response?.data?.error ?? error.message
          }`
        )
      }
    }
  }

  return { handleCallMultipleOracleReports }
}
