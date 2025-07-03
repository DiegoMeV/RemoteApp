import { convertToNumber, useCreateProvince, useEditProvince } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useRequestsProvince = ({ idEdition }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const { mutateAsync: editProvince, isPending: loadingEdit } = useEditProvince({
    idProvince: idEdition,
    onSuccess: () => {
      toast.success('Editado correctamente')
      queryClient.invalidateQueries([`/${companyData?.companyId}/departamento`])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  const { mutateAsync: createProvince, isPending: loadingCreate } = useCreateProvince({
    onSuccess: () => {
      toast.success('Creado correctamente')
      queryClient.invalidateQueries([`/${companyData?.companyId}/departamento`])
      navigate(`/applications/province`)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  return { editProvince, createProvince, loadingRequest: loadingEdit || loadingCreate }
}

export const conditionalRequest = (data, createProvince, editProvince, idEdition) => {
  const adaptData = {
    codigo_dane: data?.codigo_dane,
    nombre: data?.nombre,
    region_id: data?.region?.id,
    id_satelite: data?.satellite?.id,
    coordenadas: {
      lat: convertToNumber(data?.lat),
      lng: convertToNumber(data?.lng),
    },
  }
  if (idEdition !== 'new') {
    editProvince(adaptData)
    return // The function exits early if idEdition is not 'new'
  }
  createProvince(adaptData)
}
export const inputsProvince = ({
  infoRegion,
  isLoadingRegion,
  searchRegion,
  modalRegions,
  modalSatellite,
  satelliteInfo,
  loadingSatelliteInfo,
  searchSatellite,
}) => {
  return [
    { name: 'codigo_dane', label: 'Código Dane', space: 4, type: 'number' },
    { name: 'nombre', label: 'Nombre', required: true, space: 4 },
    {
      name: 'region',
      label: 'Region',
      type: 'autoCompleteSelect',
      required: true,
      space: 4,
      data: infoRegion?.data,
      isLoading: isLoadingRegion,
      handleSearch: searchRegion.handleSearchText,
      openModal: modalRegions?.handleShow,
    },
    {
      name: 'satellite',
      label: 'Satélite',
      type: 'autoCompleteSelect',
      space: 4,
      required: true,
      data: satelliteInfo?.data,
      isLoading: loadingSatelliteInfo,
      handleSearch: searchSatellite.handleSearchText,
      openModal: modalSatellite?.handleShow,
    },
    { name: 'lat', label: 'Latitud', space: 4, type: 'number', required: true },
    { name: 'lng', label: 'Longitud', space: 4, type: 'number', required: true },
  ]
}
