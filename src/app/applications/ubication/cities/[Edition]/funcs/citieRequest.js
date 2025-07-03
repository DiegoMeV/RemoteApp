import { convertToNumber, useCreateCitie, useEditCitie } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useRequestsCitie = ({ idCitie }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const { mutateAsync: createCitie, isPending: loadingCreate } = useCreateCitie({
    onSuccess: () => {
      queryClient.invalidateQueries([`/${companyData?.companyId}/municipios`])
      toast.success('Municipio creado con éxito')
      navigate(`/applications/ubication/cities`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  const { mutateAsync: editCitie, isPending: loadingEdit } = useEditCitie({
    idCitie,
    onSuccess: () => {
      queryClient.invalidateQueries([`/${companyData?.companyId}/municipios`])
      toast.success('Municipio editado con éxito')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  return { createCitie, editCitie, loadingUpdate: loadingCreate || loadingEdit }
}

export const conditionalRequest = (data, createCitie, editCitie, idCitie) => {
  const adaptedData = {
    codigo_dane: data?.codigo_dane,
    nombre: data?.nombre,
    departamento_id: data?.departamento?.id,
    coordenadas: {
      lat: convertToNumber(data?.lat),
      lng: convertToNumber(data?.lng),
    },
  }
  if (idCitie === 'new') {
    createCitie(adaptedData)
    return
  }
  editCitie(adaptedData)
}
