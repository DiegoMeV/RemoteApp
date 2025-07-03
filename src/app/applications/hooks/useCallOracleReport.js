import { useMutationDynamicBaseUrl } from '@/libV4'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

export const useCallOracleReport = ({ reportName, queryParams, nameShowModal }) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)
  const { mutateAsync: callOracleReport } = useMutationDynamicBaseUrl({
    url: `/app-specific/siif-web/call-oracle-report`,
    baseKey: 'urlApps',
    method: 'get',
    isCompanyRequest: true,
    onSuccess: () => {
      toast.success('Reporte generado con éxito')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al generar el reporte')
    },
  })

  const handleCallOracleReport = async () => {
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

  return { handleCallOracleReport }
}
