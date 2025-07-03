import {
  ErrorPage,
  Loading,
  useBoolean,
  useGetContractors,
  useGetTypeContracts,
  useListContractors,
  useListContractsInfo,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { ViewEditionContracts } from './view'
import { useNavigate, useParams } from 'react-router-dom'
import {
  adaptModalsData,
  adaptdataAutocompletes,
  qryBasicInfoEntities,
  useRequestsContracts,
} from './funcs'
import { useForm } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import dayjs from 'dayjs'

const EditionContracts = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { handleSubmit, ...form } = useForm()

  const idEdition = params?.idEdition || ''

  const {
    data: contractInfo,
    isFetching,
    isError,
    refetch: refetchContractInfo,
  } = useListContractsInfo({
    param: `/${idEdition}?aumentarInfo=true`,
    enabled: idEdition !== 'new',
  })

  const contract = useMemo(() => contractInfo?.data?.[0] || [], [contractInfo])

  useEffect(() => {
    if (contract) {
      form.setValue('id_contrato', contract?.id_contrato)
      form.setValue('link_contrato', contract?.link_contrato)
      form.setValue(
        'tipoContrato',
        contract?.tipo_contrato_id
          ? {
              id: contract?.tipo_contrato_id,
              nombre: contract?.nombre_tipo_contrato,
            }
          : null
      )
      form.setValue('identificador', contract?.identificador)
      form.setValue('valor', contract?.valor)
      form.setValue('valor_final_contratado', contract?.valor_final_contratado)
      form.setValue('forma_pago', contract?.forma_pago)
      form.setValue('fecha_suscripcion', dayjs(contract?.fecha_suscripcion))
      form.setValue('fecha_inicio', dayjs(contract?.fecha_inicio))
      form.setValue('fecha_fin', dayjs(contract?.fecha_fin))
      form.setValue(
        'fecha_final_terminacion',
        contract?.fecha_final_terminacion ? dayjs(contract?.fecha_final_terminacion) : null
      )
      form.setValue('plazo_ejecucion_inicial', contract?.plazo_ejecucion_inicial)
      form.setValue('plazo_ejecucion_final', contract?.plazo_ejecucion_final)
      form.setValue(
        'terceroInfo',
        contract?.terceroInfo?.id
          ? {
              id: contract?.terceroInfo?.id,
              nombre: contract?.terceroInfo?.nombre_completo,
            }
          : null
      )
      form.setValue(
        'terceroEntidadInfo',
        contract?.terceroEntidadInfo?.id
          ? {
              id: contract?.terceroEntidadInfo?.id,
              nombre: contract?.terceroEntidadInfo?.nombre_completo,
            }
          : null
      )
      form.setValue('objeto', contract?.objeto)
      form.setValue('entidad_contratante', contract?.entidadContratanteInfo)
      form.setValue('entidad_origen_recursos', contract?.entidadOrigenRecursosInfo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, form.setValue])

  const isNewContract = idEdition === 'new'

  const title = isNewContract ? 'Creación de contrato' : 'Edición de contrato'

  const searchTypeContract = useSearch()
  const searchContractor = useSearch()
  const searchEntities = useSearch()

  const modalTypeContract = useBoolean()
  const modalTypeContractSelect = useBoolean()
  const modalContractorSelect = useBoolean()
  const modalEntities = useBoolean()

  const { data: typeContracts, isLoading: loadingTC } = useGetTypeContracts({
    qry: qryBasicInfoEntities(false, searchTypeContract?.searchText),
  })

  const { data: Contractors, isLoading: loadingContractors } = useGetContractors({
    qry: qryBasicInfoEntities(false, searchContractor?.searchText),
  })

  const qryEntities = qryBasicInfoEntities(true, searchEntities?.searchText)

  const { data: entities, isLoading: loadingEntities } = useListContractors({
    qry: `?${qryEntities}&isEntidadContratante=true`,
  })

  const paramsAutocompletes = {
    typeContracts,
    loadingTC,
    modalTypeContractSelect,
    searchTypeContract,
    Contractors,
    loadingContractors,
    modalContractorSelect,
    searchContractor,
    entities,
    loadingEntities,
    modalEntities,
    searchEntities,
  }

  const autocompletes = adaptdataAutocompletes(paramsAutocompletes)

  const selectValueList = (params, input) => {
    form.setValue(input, params.row)
  }

  const handleCancel = () => {
    navigate('/applications/contracts')
  }
  const { createContract, editContract, loading } = useRequestsContracts({
    idContract: idEdition,
    refetchContractInfo,
  })

  const onSubmit = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined)
    )
    delete filteredData.variablesContrato
    const variables = data?.variables
      ? Object.values(data.variables).map((variable) => ({
          id: variable?.id,
          valor: variable?.valor,
          datos_contrato_id: variable?.datos_contrato_id,
        }))
      : []

    filteredData.variables = variables
    const {
      tipoContrato,
      terceroEntidadInfo,
      terceroInfo,
      entidad_origen_recursos,
      entidad_contratante,
      fecha_final_terminacion,
      fecha_fin,
      ...newData
    } = filteredData
    const adaptData = {
      tipo_contrato_id: tipoContrato?.id,
      tercero_id_entidad: terceroEntidadInfo?.id,
      fecha_fin: fecha_fin,
      fecha_final_terminacion: fecha_final_terminacion ?? fecha_fin ?? null,
      tercero_id: terceroInfo?.id,
      entidad_origen_recursos: entidad_origen_recursos?.id,
      entidad_contratante: entidad_contratante?.id,
      ...newData,
    }
    if (isNewContract) {
      createContract(adaptData)
      return
    }
    editContract(adaptData)
  }

  const paramsModals = {
    modalTypeContractSelect,
    typeContracts,
    loadingTC,
    searchTypeContract,
    modalContractorSelect,
    Contractors,
    loadingContractors,
    searchContractor,
    modalEntities,
    entities,
    loadingEntities,
    searchEntities,
    selectValueList,
  }

  const modalValueList = adaptModalsData(paramsModals)
  const {
    data: variablesContract,
    isLoading: loadingVariablesContract,
    isError: errorVariablesContract,
  } = useQueryDynamicApi({
    url: idEdition === 'new' ? `/datosContrato/variables` : `/datosContrato/${idEdition}/variables`,
    baseKey: 'urlCgr',
    isCompanyRequest: true,
  })

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <ViewEditionContracts
          title={title}
          loading={loading || loadingVariablesContract}
          isNewContract={isNewContract}
          idEdition={idEdition}
          isError={isError || errorVariablesContract}
          autocompletes={autocompletes}
          modals={{ modalValueList, modalTypeContract }}
          form={{ ...form, handleSubmit: handleSubmit(onSubmit), handleCancel }}
          idTypeContract={contract?.tipo_contrato_id}
          variablesContract={variablesContract}
        />
      )}
    </>
  )
}

export default EditionContracts
