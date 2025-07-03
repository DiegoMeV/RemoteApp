import { GenericAlertForm } from '@/app/applications/components'
import {
  BackdropLoading,
  ValueListGlobal,
  convertToNumber,
  useBoolean,
  useGetProvince,
  useSearch,
} from '@/lib'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { conditionalRequest, useRequestsCitie } from '../funcs'
import { inputsCities } from '../../funcs'

const FormCitie = ({ infoCitie, idEdition }) => {
  const navigate = useNavigate()
  const citieValues = infoCitie?.data?.[0] || {}
  const coordenadas = citieValues?.coordenadas ? JSON.parse(citieValues?.coordenadas) : {}

  const searchProvince = useSearch()
  const modalProvinces = useBoolean()
  const { data: provinces, isLoading: loadingProvinces } = useGetProvince({
    qry: `?palabraClave=${searchProvince?.searchText ?? ''}&activo=S`,
  })

  const selectedOption = (data) => {
    setValue('departamento', data)
  }

  const inputs = inputsCities(
    provinces,
    loadingProvinces,
    searchProvince,
    modalProvinces,
    selectedOption
  )

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      codigo_dane: citieValues?.codigo_dane,
      nombre: citieValues?.nombre,
      departamento: citieValues?.departamentoInfo,
      lat: convertToNumber(coordenadas?.lat),
      lng: convertToNumber(coordenadas?.lng),
    },
  })

  const { createCitie, editCitie, loadingUpdate } = useRequestsCitie({ idCitie: idEdition })

  const onSubmit = async (data) => {
    await conditionalRequest(data, createCitie, editCitie, idEdition)
  }

  return (
    <>
      <BackdropLoading loading={loadingUpdate} />
      <GenericAlertForm
        inputs={inputs}
        control={control}
        submitForm={handleSubmit(onSubmit)}
        setValue={setValue}
        onClickCancel={() => navigate(`/applications/ubication/cities`)}
      />
      <ValueListGlobal
        openOptions={modalProvinces}
        rows={provinces?.data}
        columns={[
          {
            field: 'nombre',
            title: 'Nombre',
            flex: 1,
          },
        ]}
        selectedOption={(params) => selectedOption(params.row)}
        loading={loadingProvinces}
        searchOptions={searchProvince}
      />
    </>
  )
}

export default FormCitie
