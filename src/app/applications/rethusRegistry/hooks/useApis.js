import { MagicString, useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

//Function to get the data from the API
export const useRethusData = (setRows) => {
  const { mutateAsync: rethusDataProcess, isPending: loadingRethusData } =
    useMutationDynamicBaseUrl({
      url: `/apps-specific/rethus/completed-processes`,
      baseKey: 'urlProcess',
      isCompanyRequest: 'true',
      method: 'get',
      onSuccess: (data) => {
        setRows(data?.data)
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
      },
    })
  return { rethusDataProcess, loadingRethusData }
}

//Function to generate rethus group

export const useGenerateRethusGroup = ({ rethusDataProcess, paramsData, filterValue }) => {
  const { mutateAsync: createRethus, isPending } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: '/export-data/rethus-registry',
    isCompanyRequest: true,
    onSuccess: (data) => {
      rethusDataProcess({ qry: `?${paramsData[filterValue]}` })
      toast.success('Archivo plano generado correctamente')
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'archivo.txt')
      document.body.appendChild(link)
      link.click()
      // Limpiar el enlace y la URL temporal
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
    },
  })
  return { createRethus, isPending }
}

export const useSentConfirmationEmail = ({ rethusDataProcess, paramsData, filterValue }) => {
  const { mutateAsync: sendConfirmationEmail, isPending: loadingEmail } = useMutationDynamicBaseUrl(
    {
      baseKey: 'urlProcess',
      url: 'apps-specific/rethus',
      method: 'get',
      isCompanyRequest: true,
      onSuccess: () => {
        toast.success('Correo de confirmación enviado correctamente')
        rethusDataProcess({ qry: `?${paramsData[filterValue]}` })
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
      },
    }
  )
  return { sendConfirmationEmail, loadingEmail }
}
