import { useStoreActions } from 'easy-peasy'
import { useRequestsFamilyServices } from '../../hooks'
import { useBoolean } from '@/lib/ui'
import { useSearch } from '@/lib/components/searchTable'
import {
  additionalDataToComplainantOrAccusedForm,
  complainantOrAccusedForm,
  enabledCharacterizacion,
  setDefaultValues,
} from '../../constants'
import { useMutationDynamicBaseUrl, useQueryDynamicApi } from '@/lib/api'
import toast from 'react-hot-toast'
import { convertDataForBody, setActor } from '../../funcs'
import { useEffect } from 'react'
import { calculateAge } from '@/lib/funcs'
import ModalComplainantOrAccused from './ModalComplainantOrAccused'

const AddOrEditComplainantOrAccused = ({
  modalOptionsFS,
  typeTable,
  formModal,
  idProcess,
  rowParams,
}) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const { editActor, createActor, loadingRequests } = useRequestsFamilyServices({
    idProcess,
    typeTable,
    modalOptionsFS,
  })

  const validationsV2 =
    formModal?.watch(['documentType', 'fecha_nacimiento', 'persona_condicion_discapacidad']) || []

  const characterization = useBoolean(true)

  const valueListEducationLevel = useBoolean()
  const searchEducationLevel = useSearch()

  const modalNeighborhoods = useBoolean()
  const searchNeighborhoods = useSearch()

  const modalProvinces = useBoolean()
  const searchDepartments = useSearch()

  const enabledAdditionalData = enabledCharacterizacion.includes(validationsV2?.[0])

  const qryEducationLevel = searchEducationLevel?.searchText
    ? `?nombre=${searchEducationLevel?.searchText}`
    : ''

  const educationalLevel = useQueryDynamicApi({
    url: `/generic-crud/nivel_educativo/${qryEducationLevel}`,
    baseKey: 'urlApps',
    isCompanyRequest: true,
    enabled: !enabledAdditionalData,
  })

  const { mutateAsync: getEducationLevelById, isPending: loadingEducationLevel } =
    useMutationDynamicBaseUrl({
      url: `/generic-crud/nivel_educativo/`,
      baseKey: 'urlApps',
      isCompanyRequest: true,
      method: 'get',
      onSuccess: (response) => {
        const id = response?.data?.[0]?.id ?? null
        const name = response?.data?.[0]?.nombre ?? null
        formModal.setValue('nivel_educativo', { id: id, name: name })
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message ?? 'Error al buscar el nivel educativo')
      },
    })

  const qryProvinces = searchDepartments?.searchText
    ? `?nombre=${searchDepartments?.searchText}`
    : ''

  const provincesInfo = useQueryDynamicApi({
    url: `generic-crud/departamentos/${qryProvinces}`,
    baseKey: 'urlApps',
    isCompanyRequest: true,
    enabled: !enabledAdditionalData,
  })

  const { mutateAsync: getProvinceById, isPending: loadingProvinces } = useMutationDynamicBaseUrl({
    url: '/generic-crud/departamentos/',
    baseKey: 'urlApps',
    isCompanyRequest: true,
    method: 'get',
    onSuccess: (response) => {
      const id = response?.data?.[0]?.id ?? null
      const name = response?.data?.[0]?.nombre ?? null
      formModal.setValue('departamento_procedencia', id && name ? { id: id, name: name } : {})
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? 'Error al buscar el nivel educativo')
    },
  })

  const { mutateAsync: searchActor, isPending: loadingActor } = useMutationDynamicBaseUrl({
    url: `/general/seek-actors`,
    baseKey: 'urlProcess',
    method: 'get',
    isCompanyRequest: true,
    onSuccess: (response) => {
      setActor(
        response,
        formModal,
        getEducationLevelById,
        getProvinceById,
        getNeighborhoodsByID,
        searchCommune
      )
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? 'Error al buscar actor')
    },
  })

  const qryNeighborhoods = searchNeighborhoods?.searchText
    ? `?nombre=${searchNeighborhoods?.searchText}`
    : ''

  const { mutateAsync: searchCommune, isPending: loadingCommune } = useMutationDynamicBaseUrl({
    url: `/generic-crud/grupos_barrios/`,
    baseKey: 'urlApps',
    method: 'get',
    isCompanyRequest: true,
    onSuccess: (response) => {
      const id = response?.data[0]?.id ?? ''
      const communeName = response?.data[0]?.nombre ?? ''
      const zoneValue = response?.data[0]?.zona ?? ''
      formModal.setValue(
        'comuna_corregimiento',
        id && communeName ? { id: id, name: communeName } : {}
      )
      formModal.setValue('zona_residencial', zoneValue)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? 'Error al buscar la comuna')
    },
  })

  const { mutateAsync: getNeighborhoodsByID, isPending: loadingNeighborhoods } =
    useMutationDynamicBaseUrl({
      url: `/generic-crud/barrios/`,
      baseKey: 'urlApps',
      method: 'get',
      isCompanyRequest: true,
      onSuccess: (response) => {
        const id = response?.data[0]?.id ?? ''
        const nombre = response?.data[0]?.nombre ?? ''
        formModal.setValue('barrio_vereda', id && nombre ? { id: id, name: nombre } : {})
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message ?? 'Error al buscar la comuna')
      },
    })

  const onBlurIdentification = async (event) => {
    if (!!event.target.value && event.target.value !== '') {
      searchActor({
        qry: `?identification=${event.target.value}`,
      })
    }
  }

  useEffect(() => {
    if (rowParams) {
      setDefaultValues(
        rowParams,
        formModal,
        getEducationLevelById,
        getProvinceById,
        getNeighborhoodsByID,
        searchCommune
      )
    }
  }, [
    formModal,
    getEducationLevelById,
    getNeighborhoodsByID,
    getProvinceById,
    rowParams,
    searchCommune,
  ])

  const handleChangeDocumentType = (e) => {
    const enabledAdditionalData = enabledCharacterizacion.includes(e.target.value)

    formModal.setValue('documentType', e.target.value)
    if (!enabledAdditionalData) {
      additionalDataActor.forEach((item) => {
        formModal.setValue(item?.name, null)
      })
      return
    }
  }

  const handleChangeDateBirth = (newValue) => {
    formModal.setValue('fecha_nacimiento', newValue)
    const isAMinor = calculateAge(newValue) <= 18
    if (isAMinor) {
      formModal.setValue('orientacion_sexual', null)
      formModal.setValue('cabeza_familia', false)
    }
  }

  const handleChangeDisabilityStatus = (e) => {
    formModal.setValue('persona_condicion_discapacidad', e.target.checked)
    if (!e.target.checked) {
      formModal.setValue('tipo_discapacidad', null)
    }
  }

  const handleChangeIdentification = (e) => {
    const regex = /^[0-9a-zA-Z-]*$/
    if (regex.test(e.target.value)) {
      formModal.setValue('documentNumber', e.target.value)
    }
  }

  const handleChangeEducationalLevel = (newValue) => {
    if (newValue) {
      formModal.setValue('nivel_educativo', newValue)
      return
    }
    formModal.setValue('nivel_educativo', null)
  }

  const handleChangeBornProvince = (newValue) => {
    if (newValue) {
      formModal.setValue('departamento_procedencia', newValue)
      return
    }
    formModal.setValue('departamento_procedencia', null)
  }

  const handleChangeNeighborhood = (newValue) => {
    if (newValue) {
      formModal.setValue('barrio_vereda', newValue)
      if (newValue?.id_grupo) {
        searchCommune({ qry: `${newValue?.id_grupo}?` })
      }
      return
    }
    formModal.setValue('barrio_vereda', null)
  }

  const basicData = complainantOrAccusedForm(
    handleChangeDocumentType,
    validationsV2,
    onBlurIdentification,
    typeTable,
    handleChangeIdentification
  )

  const neighborhoodsInfo = useQueryDynamicApi({
    url: `generic-crud/barrios/${qryNeighborhoods}`,
    baseKey: 'urlApps',
    isCompanyRequest: true,
    enabled: !enabledAdditionalData,
  })

  const additionalDataActor = additionalDataToComplainantOrAccusedForm({
    handleChangeDateBirth,
    handleChangeDisabilityStatus,
    validationsV2,
    educationalLevel,
    formModal,
    lovEducationLevel: {
      valueListEducationLevel,
      handleChangeEducationalLevel,
      searchEducationLevel,
    },
    lovNeighborhoods: {
      modalNeighborhoods,
      neighborhoodsInfo,
      handleChangeNeighborhood,
      searchNeighborhoods,
    },
    lovDepartments: {
      modalProvinces,
      provincesInfo,
      handleChangeBornProvince,
      searchDepartments,
    },
  })

  const onSubmit = async (data) => {
    const newData = convertDataForBody(data)
    const adaptData = {
      actorTypeKey: typeTable,
      actorData: { additionalData: newData },
    }
    if (rowParams) {
      await editActor({
        qry: `/${rowParams?.id}`,
        methodBody: 'put',
        body: { actorData: { additionalData: newData } },
      })
      return
    }
    createActor({ body: adaptData })
  }

  const onError = () => {
    toast.error('Faltan campos por completar o corregir')
  }

  const handleCloseModal = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Cancelar',
      content: '¿Esta seguro que desea cancelar',
      onConfirm: () => {
        modalOptionsFS.handleShow()
      },
    })
  }
  return (
    <ModalComplainantOrAccused
      loading={
        loadingRequests ||
        loadingEducationLevel ||
        loadingProvinces ||
        loadingActor ||
        loadingCommune ||
        loadingNeighborhoods
      }
      modalOptionsFS={modalOptionsFS}
      handleCloseModal={handleCloseModal}
      formModal={formModal}
      onSubmit={onSubmit}
      onError={onError}
      typeTable={typeTable}
      basicData={basicData}
      enabledAdditionalData={enabledAdditionalData}
      characterization={characterization}
      additionalDataActor={additionalDataActor}
      valueListEducationLevel={valueListEducationLevel}
      educationalLevel={educationalLevel}
      searchEducationLevel={searchEducationLevel}
      handleChangeEducationalLevel={handleChangeEducationalLevel}
      modalProvinces={modalProvinces}
      provincesInfo={provincesInfo}
      handleChangeBornProvince={handleChangeBornProvince}
      searchDepartments={searchDepartments}
      modalNeighborhoods={modalNeighborhoods}
      neighborhoodsInfo={neighborhoodsInfo}
      handleChangeNeighborhood={handleChangeNeighborhood}
      searchNeighborhoods={searchNeighborhoods}
    />
  )
}

export default AddOrEditComplainantOrAccused
