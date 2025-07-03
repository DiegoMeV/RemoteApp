import { useCreateMember, useEditMember } from '@/lib'
import { Typography } from '@mui/material'
import { GridRowModes } from '@mui/x-data-grid-premium'
import toast from 'react-hot-toast'

export const inputsContract = (
  autocompletes,
  modalTypeContract,
  setBackPathUrl,
  setModalShow,
  isNewContract,
  setValue,
  watch
) => {
  const { typeContract, contractor, entities } = autocompletes

  return [
    { name: 'id_contrato', label: 'ID contrato', space: 3, required: true },
    { name: 'link_contrato', label: 'Link contrato', space: 3, type: 'url' },
    {
      name: 'tipoContrato',
      label: 'Modalidad de contratación',
      space: 6,
      required: true,
      type: 'autoCompleteSelect',
      data: typeContract?.data,
      openModal: typeContract?.openModal,
      handleSearch: typeContract?.searchTypeContract.handleSearchText,
    },
    {
      label: 'Crear modalidad de contratación',
      space: 6,
      type: 'button',
      onClick: modalTypeContract.handleShow,
    },
    { name: 'identificador', label: 'Número de contrato', space: 3, required: true },
    {
      name: 'valor',
      label: 'Valor',
      space: 3,
      type: 'money',
      onChange: (e) => {
        if (isNewContract) {
          setValue('valor_final_contratado', e)
        }
      },
    },
    {
      name: 'valor_final_contratado',
      label: 'Valor final',
      space: 3,
      type: 'money',
      readOnly: true,
    },
    { name: 'forma_pago', label: 'Forma de pago', space: 3, type: 'text' },
    { name: 'fecha_suscripcion', label: 'Fecha de suscripción', space: 3, type: 'date' },
    { name: 'fecha_inicio', label: 'Fecha de inicio', space: 3, type: 'date', required: true },
    {
      name: 'fecha_fin',
      label: 'Fecha inicial de terminación',
      space: 3,
      type: 'date',
      minDate: watch('fecha_inicio'),
      validate: (value) => {
        if (value < watch('fecha_inicio')) {
          return 'La fecha no puede ser menor a la de inicio del contrato'
        }
        return true
      },
    },
    {
      name: 'fecha_final_terminacion',
      label: 'Fecha final de terminación',
      space: 3,
      type: 'date',
      readOnly: true,
    },
    {
      name: 'plazo_ejecucion_inicial',
      label: 'Plazo de ejecución inicial',
      space: 3,
      type: 'number',
    },
    { name: 'plazo_ejecucion_final', label: 'Plazo de ejecución final', space: 3, type: 'number' },
    {
      name: 'terceroEntidadInfo',
      label: 'Entidad',
      space: 6,
      type: 'autoCompleteSelect',
      data: entities?.data,
      openModal: entities?.openModal,
      handleSearch: entities?.searchEntities.handleSearchText,
    },
    {
      name: 'terceroInfo',
      label: 'Contratista',
      space: 6,
      type: 'autoCompleteSelect',
      data: contractor?.data,
      openModal: contractor?.openModal,
      handleSearch: contractor?.searchContractor.handleSearchText,
      required: true,
    },

    {
      label: 'Crear Tercero',
      space: 3,
      type: 'button',
      onClick: () => {
        setModalShow()
        setBackPathUrl('/applications/contracts/new')
      },
    },
    { name: 'objeto', label: 'Objeto', type: 'multiline', space: 12 },
  ]
}

export const selectAutocompleteRegions = (apiRef, props, newValue) => {
  const { id, field, value } = props
  apiRef.current.setEditCellValue({ id, field, value: newValue || value })
  apiRef.current.setEditCellValue({
    id,
    field: 'departamentoInfo',
    value: { id: newValue?.departamento_id, nombre: newValue?.nombre_departamento },
  })
  apiRef.current.setEditCellValue({
    id,
    field: 'regionInfo',
    value: { id: newValue?.region_id, nombre: newValue?.nombre_region },
  })
}

export const selectAutocompleteMember = (apiRef, props, newValue) => {
  const { id, field, value } = props
  apiRef.current.setEditCellValue({ id, field, value: newValue || value })
  apiRef.current.setEditCellValue({
    id,
    field: 'tipo_identificacion',
    value: newValue?.tercero?.tipo_identificacion,
  })
  apiRef.current.setEditCellValue({
    id,
    field: 'numero_identificacion',
    value: newValue?.tercero?.numero_identificacion,
  })
}

export const useRequestsMembers = ({
  setRowModesModel,
  rowSelected,
  refetchMembers,
  setNewRow,
}) => {
  const errorRowModel = () => {
    setRowModesModel((prev) => {
      return {
        ...prev,
        [rowSelected.id]: { mode: GridRowModes.Edit, ignoreModifications: true },
      }
    })
  }
  const { mutateAsync: createMember, isPending: loadingCreate } = useCreateMember({
    onSuccess: () => {
      toast.success('Integrante creado exitosamente')
      refetchMembers()
      setNewRow(false)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al crear origen de recurso')
      errorRowModel()
    },
  })
  const { mutateAsync: editMember, isPending: loadingEdit } = useEditMember({
    onSuccess: (e) => {
      const message =
        e?.data?.es_borrado === true
          ? 'Integrante eliminado exitosamente'
          : 'Integrante editado exitosamente'
      toast.success(message)
      refetchMembers()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al editar origen de recurso')
      errorRowModel()
    },
  })
  return {
    createMember,
    editMember,
    loadingRequest: loadingCreate || loadingEdit,
  }
}

const columnsContractors = [
  { field: 'nombre_completo', headerName: 'Nombre', minWidth: 200 },
  { field: 'tipo_identificacion', headerName: 'Tipo de identificación', minWidth: 200 },
  { field: 'nro_identificacion', headerName: 'Identificación', minWidth: 200 },
]
const columnsTypeContracts = [
  { field: 'nombre', headerName: 'Nombre', minWidth: 200 },
  { field: 'descripcion', headerName: 'Descripción', minWidth: 200 },
]

export const adaptdataAutocompletes = (paramsAutocompletes) => {
  const {
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
  } = paramsAutocompletes
  return {
    typeContract: {
      data: typeContracts?.data ?? [],
      isLoading: loadingTC,
      openModal: modalTypeContractSelect?.handleShow,
      searchTypeContract: searchTypeContract,
    },
    contractor: {
      data: Contractors?.data ?? [],
      isLoading: loadingContractors,
      openModal: modalContractorSelect?.handleShow,
      searchContractor: searchContractor,
    },
    entities: {
      data: entities?.data ?? [],
      isLoading: loadingEntities,
      openModal: modalEntities?.handleShow,
      searchEntities: searchEntities,
    },
  }
}

export const adaptModalsData = (paramsModals) => {
  const {
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
  } = paramsModals
  return [
    {
      open: modalTypeContractSelect,
      handleShow: modalTypeContractSelect?.handleShow,
      title: 'Modalidad de contratación',
      columns: columnsTypeContracts,
      rows: typeContracts?.data,
      loading: loadingTC,
      selectedOption: (params) => selectValueList(params, 'tipoContrato'),
      searchOptions: searchTypeContract,
    },
    {
      open: modalContractorSelect,
      handleShow: modalContractorSelect?.handleShow,
      title: 'Contratistas',
      columns: columnsContractors,
      rows: Contractors?.data,
      loading: loadingContractors,
      selectedOption: (params) => selectValueList(params, 'terceroInfo'),
      searchOptions: searchContractor,
    },
    {
      open: modalEntities,
      handleShow: modalEntities?.handleShow,
      title: 'Entidades',
      columns: columnsContractors,
      rows: entities?.data,
      loading: loadingEntities,
      selectedOption: (params) => selectValueList(params, 'terceroEntidadInfo'),
      searchOptions: searchEntities,
    },
  ]
}

export const qryBasicInfoEntities = (isAnd, palabraClave) => {
  let qry = isAnd ? '&activo=S' : '?activo=S'
  if (palabraClave) {
    qry += `&palabraClave=${palabraClave}`
  }
  return qry
}

export const selectAutocompleteCitie = (apiRef, props, newValue) => {
  const { id, field, value } = props
  if (!newValue) {
    apiRef.current.setEditCellValue({ id, field, value: null })
    apiRef.current.setEditCellValue({
      id,
      field: 'departamentoInfo',
      value: null,
    })
    apiRef.current.setEditCellValue({
      id,
      field: 'regionInfo',
      value: null,
    })
    apiRef.current.setEditCellValue({
      id,
      field: 'sateliteInfo',
      value: null,
    })
    return
  }
  apiRef.current.setEditCellValue({ id, field, value: newValue || value })
  apiRef.current.setEditCellValue({
    id,
    field: 'departamentoInfo',
    value: { id: newValue?.departamentoInfo?.id, nombre: newValue?.departamentoInfo?.nombre },
  })
  apiRef.current.setEditCellValue({
    id,
    field: 'regionInfo',
    value: {
      id: newValue?.departamentoInfo?.regionInfo?.id,
      nombre: newValue?.departamentoInfo?.regionInfo?.nombre,
    },
  })
  apiRef.current.setEditCellValue({
    id,
    field: 'sateliteInfo',
    value: {
      id: newValue?.departamentoInfo?.sateliteInfo?.id,
      nombre: newValue?.departamentoInfo?.sateliteInfo?.nombre,
    },
  })
}
export const selectAutocompleteProvince = (apiRef, props, newValue) => {
  const { id, field, value } = props
  if (!newValue) {
    apiRef.current.setEditCellValue({ id, field, value: null })
    apiRef.current.setEditCellValue({
      id,
      field: 'municipioInfo',
      value: null,
    })
    apiRef.current.setEditCellValue({
      id,
      field: 'regionInfo',
      value: null,
    })
    apiRef.current.setEditCellValue({
      id,
      field: 'sateliteInfo',
      value: null,
    })
    return
  }
  apiRef.current.setEditCellValue({ id, field, value: newValue || value })
  apiRef.current.setEditCellValue({
    id,
    field: 'municipioInfo',
    value: null,
  })
  apiRef.current.setEditCellValue({
    id,
    field: 'regionInfo',
    value: {
      id: newValue?.region_id,
      nombre: '',
    },
  })
  apiRef.current.setEditCellValue({
    id,
    field: 'sateliteInfo',
    value: {
      id: newValue?.id_satelite,
      nombre: '',
    },
  })
}

export const modalsRegions = ({
  model,
  modalCities,
  cities,
  searchCitie,
  loadingCities,
  modalProvinces,
  provinces,
  searchPrivinces,
  loadingProvinces,
  setIdProvince,
  setModel,
}) => {
  return [
    {
      openOptions: modalCities,
      title: 'Municipios',
      data: cities?.data ?? [],
      columns: [
        {
          field: 'regionInfo',
          headerName: 'Región',
          minWidth: 250,
          renderCell: (params) => {
            return (
              <Typography variant='body2'>
                {params?.row?.departamentoInfo?.regionInfo?.nombre ?? ''}
              </Typography>
            )
          },
        },
        {
          field: 'departamentoInfo',
          headerName: 'Departamento',
          minWidth: 250,

          renderCell: (params) => (
            <Typography variant='body2'>{params?.row?.departamentoInfo?.nombre ?? ''}</Typography>
          ),
        },
        {
          field: 'nombre',
          headerName: 'Municipio',
          minWidth: 250,
        },
      ],
      searchOptions: searchCitie,
      loading: loadingCities,
      selectAutocomplete: selectAutocompleteCitie,
      pagination: {
        rowCountState: cities?.paginacion?.total ?? 0,
        paginationMode: 'server',
        paginationModel: model,
        handlePaginationModelChange: (model) => {
          setModel(model)
        },
      },
    },
    {
      openOptions: modalProvinces,
      title: 'Departamentos',
      data: provinces?.data ?? [],
      columns: [
        {
          field: 'nombre_region',
          headerName: 'Región',
          renderCell: (params) => {
            return <Typography variant='body2'>{params?.row?.regionInfo?.nombre ?? ''}</Typography>
          },
        },
        {
          field: 'nombre',
          headerName: 'Departamento',
        },
      ],
      searchOptions: searchPrivinces,
      loading: loadingProvinces,
      selectAutocomplete: selectAutocompleteProvince,
      setId: setIdProvince,
    },
  ]
}
