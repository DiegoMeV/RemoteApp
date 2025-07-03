import { GenericAlertForm } from '@/app/applications/components'
import {
  BackdropLoading,
  ValueListGlobal,
  convertToNumber,
  useBoolean,
  useListRegionsInfo,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { useForm } from 'react-hook-form'
import { conditionalRequest, inputsProvince, useRequestsProvince } from '../funcs'
import { useNavigate } from 'react-router-dom'

const FormProvince = ({ infoProvince, idEdition }) => {
  const navigate = useNavigate()
  const ProvinceValues = infoProvince?.data?.[0] || {}
  const coordenadas = ProvinceValues?.coordenadas ? JSON.parse(ProvinceValues?.coordenadas) : {}
  const modalRegions = useBoolean()
  const modalSatellite = useBoolean()
  const searchSatellite = useSearch()
  const searchRegion = useSearch()

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      codigo_dane: ProvinceValues?.codigo_dane,
      nombre: ProvinceValues?.nombre,
      region: { id: ProvinceValues?.regionInfo?.id, nombre: ProvinceValues?.regionInfo?.nombre },
      satellite: { id: ProvinceValues?.id_satelite, nombre: ProvinceValues?.sateliteInfo?.nombre },
      lat: convertToNumber(coordenadas?.lat),
      lng: convertToNumber(coordenadas?.lng),
    },
  })

  const selectRegionOnValueList = (data) => {
    setValue('region', data)
  }
  const selectSatelliteOnValueList = (data) => {
    setValue('satellite', data)
  }

  const { data: infoRegion, isLoading: isLoadingRegion } = useListRegionsInfo({
    qry: searchRegion.searchText
      ? `?palabraClave=${searchRegion?.searchText}&activo=S`
      : '?activo=S',
  })
  const { data: satelliteInfo, isLoading: loadingSatelliteInfo } = useQueryDynamicApi({
    url: searchSatellite?.searchText
      ? `/satelite?palabraClave=${searchSatellite?.searchText}`
      : '/satelite',
    isCompanyRequest: true,
    baseKey: 'urlCgr',
  })

  const inputs = inputsProvince({
    infoRegion,
    isLoadingRegion,
    searchRegion,
    modalRegions,
    modalSatellite,
    satelliteInfo,
    loadingSatelliteInfo,
    searchSatellite,
  })

  const { editProvince, createProvince, loadingRequest } = useRequestsProvince({ idEdition })

  const onSubmit = async (data) => {
    await conditionalRequest(data, createProvince, editProvince, idEdition)
  }
  const handleCancel = () => {
    navigate('/applications/ubication/province')
  }
  return (
    <>
      <BackdropLoading loading={loadingRequest} />
      <GenericAlertForm
        inputs={inputs}
        control={control}
        setValue={setValue}
        submitForm={handleSubmit(onSubmit)}
        onClickCancel={handleCancel}
      />
      <ValueListGlobal
        openOptions={modalRegions.show ? modalRegions : modalSatellite.show ? modalSatellite : null}
        rows={modalRegions.show ? infoRegion?.data : modalSatellite.show ? satelliteInfo?.data : []}
        columns={[
          {
            field: 'nombre',
            title: 'Nombre',
            flex: 1,
          },
        ]}
        selectedOption={({ row }) =>
          modalRegions.show
            ? selectRegionOnValueList(row)
            : modalSatellite.show
            ? selectSatelliteOnValueList(row)
            : null
        }
        loading={isLoadingRegion || loadingSatelliteInfo}
        searchOptions={searchRegion || searchSatellite}
      />
    </>
  )
}

export default FormProvince
