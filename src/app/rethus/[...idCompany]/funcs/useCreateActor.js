import { useMutationDynamicBaseUrl } from '@/lib'
import toast from 'react-hot-toast'

export const useCreateActor = ({ idCompany, setActiveStep }) => {
  const { mutateAsync: createActor, isPending: loadingCreationActor } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: `/processes`,
    isCompanyRequest: true,
    companyId: idCompany,
    onSuccess: () => {
      toast.success('Se ha creado el actor correctamente')
      setActiveStep(2)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al crear el actor')
    },
  })
  return { createActor, loadingCreationActor }
}
