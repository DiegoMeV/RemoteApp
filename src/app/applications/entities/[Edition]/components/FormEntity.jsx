import { GenericAlertForm } from '@/app/applications/components'
import {
  BackdropLoading,
  ValueListGlobal,
  buildQueryStringUserService,
  useBoolean,
  usePagination,
  useSearch,
  useSearchHierarchy,
} from '@/lib'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { conditionalRequest, inputsEntity, useUpdateRequest } from '../funcs'
import { useState } from 'react'

const FormEntity = ({ infoEntity, idEdition }) => {
  const navigate = useNavigate()
  const entityValues = infoEntity?.data?.[0] || {}
  const [pageSize, setPageSize] = useState(50)
  const [cursor, setCursor] = useState()
  const searchDependencias = useSearch()
  const modalDependencias = useBoolean()

  const qryDependencias = buildQueryStringUserService(
    pageSize,
    cursor,
    searchDependencias?.searchText
  )

  const { data: dependencias, isLoading } = useSearchHierarchy({ qry: qryDependencias })

  const paginationDependencias = usePagination(dependencias, { setPageSize, setCursor }, isLoading)

  const inputs = inputsEntity(
    dependencias,
    modalDependencias,
    isLoading,
    searchDependencias?.handleSearchText
  )

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      identificacion: entityValues?.identificacion,
      nombre: entityValues?.nombre,
      resolucion: entityValues?.resolucion,
      fecha_resolucion: entityValues?.fecha_resolucion,
      vigencia: entityValues?.vigencia,
      activo: entityValues?.activo === 'S' ? true : false,
      dependencia_comp: entityValues?.dataDependencia,
    },
  })

  const selectDependencia = (params) => {
    setValue('dependencia_comp', params?.row)
  }

  const { createEntity, editEntity, loadingUpdate } = useUpdateRequest({ idEntity: idEdition })

  const onSubmit = async (data) => {
    const adaptedData = {
      ...data,
      activo: data.activo ? 'S' : 'N',
      dependencia_comp: data.dependencia_comp?.id,
      vigilado: 'S',
    }

    await conditionalRequest(adaptedData, editEntity, createEntity, idEdition)
  }

  return (
    <>
      <BackdropLoading loading={loadingUpdate} />
      <GenericAlertForm
        inputs={inputs}
        control={control}
        submitForm={handleSubmit(onSubmit)}
        onClickCancel={() => navigate(`/applications/entities`)}
        setValue={setValue}
      />
      <ValueListGlobal
        openOptions={modalDependencias}
        title='Dependencias'
        rows={dependencias?.data}
        searchOptions={searchDependencias}
        selectedOption={selectDependencia}
        loading={isLoading}
        columns={[
          {
            field: 'name',
            headerName: 'Nombre',
            flex: 1,
          },
        ]}
        pagination={paginationDependencias}
      />
    </>
  )
}

export default FormEntity
