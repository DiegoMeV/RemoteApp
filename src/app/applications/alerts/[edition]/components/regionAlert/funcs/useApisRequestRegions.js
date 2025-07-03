import { createQuery } from '@/app/applications/funcs'
import {
  useCreateRegionAlert,
  useGetProvince,
  useGetRegionByAlert,
  useListCities,
  useUpdateRegionAlert,
} from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useApisRequestRegions = ({
  model,
  searchCities,
  searchDepartments,
  setNewRow,
  infoAlert,
  regionAlertAccState,
  idProvince,
  valueListCities,
  valueListDepartments,
}) => {
  const queryClient = useQueryClient()
  const qry = createQuery({ search: searchCities, model })

  const { data: cities, isFetching: loadingCities } = useListCities({
    qry: `${qry}${idProvince ? `&departamento_id=${idProvince}` : ''}`,
    enabled: regionAlertAccState && (valueListCities?.show || searchCities.searchText?.length > 1),
  })

  const { data: infoProvince, isFetching: loadingProvince } = useGetProvince({
    qry: searchDepartments.searchText
      ? `?palabraClave=${searchDepartments.searchText}&aumentarInfo=true`
      : null,
    enabled:
      regionAlertAccState &&
      (valueListDepartments?.show || searchDepartments.searchText?.length > 1),
  })
  const {
    data: regions,
    isFetching: loadingRegions,
    isError: errorRegion,
  } = useGetRegionByAlert({ idAlerta: infoAlert?.id, enabled: regionAlertAccState })
  const { mutateAsync: createRegionAlert, isPending: loadingCreateRegion } = useCreateRegionAlert({
    onSuccess: () => {
      toast.success('Región afectada asociada a la alerta con éxito')
      queryClient.invalidateQueries([`/regionesAlerta`])
      setNewRow(false)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al asociar región afectada a la alerta')
    },
  })
  const { mutateAsync: updateRegionInAlert, isPending: loadingUpdateRegion } = useUpdateRegionAlert(
    {
      onSuccess: () => {
        toast.success('Región afectada actualizada con éxito')
        queryClient.invalidateQueries([`/regionesAlerta`])
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al actualizar región afectada')
      },
    }
  )
  const loadingRows = loadingCities || loadingProvince
  const loadingUpdate = loadingCreateRegion || loadingUpdateRegion
  return {
    cities,
    infoProvince,
    regions,
    loadingRows,
    loadingRegions,
    errorRegion,
    createRegionAlert,
    updateRegionInAlert,
    loadingUpdate,
  }
}
