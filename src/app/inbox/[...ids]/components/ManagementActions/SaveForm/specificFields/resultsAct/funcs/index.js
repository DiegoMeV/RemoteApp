import { ClassicIconButton } from '@/lib'
import { Edit } from '@mui/icons-material'

export const columnsRA = (setRowParams, handleShow) => [
  {
    field: 'identifieAlert',
    headerName: 'Identificador de la alerta',
    minWidth: 200,
    valueGetter: (params) => {
      return `${params?.row?.dataAlerta?.identificador ?? ''}`
    },
  },
  {
    field: 'identifierModel',
    headerName: 'Identificador del modelo',
    minWidth: 200,
    valueGetter: (params) => {
      return `${params?.row?.dataAlerta?.modeloInfo?.identificador ?? ''}`
    },
  },
  {
    field: 'modelName',
    headerName: 'Nombre del modelo',
    minWidth: 300,
    valueGetter: (params) => {
      return `${params?.row?.dataAlerta?.modeloInfo?.nombre ?? ''}`
    },
  },
  {
    field: 'resultType',
    headerName: 'Tipo de resultado',
    valueGetter: (params) => {
      return `${params?.row?.tipoResultadoInfo?.nombre ?? ''}`
    },
    minWidth: 300,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    minWidth: 300,
  },
  {
    field: 'options',
    headerName: '',
    maxWidth: 60,
    renderCell: (params) => {
      return (
        <>
          <ClassicIconButton
            color='secondary'
            onClick={() => {
              setRowParams(params.row)
              handleShow()
            }}
          >
            <Edit />
          </ClassicIconButton>
        </>
      )
    },
  },
]

export const inputsAddOrEdit = (
  resultTypesInfo,
  loadingResultsTypeInfo,
  modalResultType,
  searchResultType,
  isNewResult,
  alertIdentifier
) => [
  {
    name: 'resultType',
    type: 'autocomplete',
    required: true,
    autocompleteProps: {
      options: resultTypesInfo?.data ?? [],
      loadingOptions: loadingResultsTypeInfo,
      openModal: modalResultType.handleShow,
      disabled: !isNewResult,
    },
    textFieldProps: {
      label: 'Tipo de resultado',
      onChange: (e) => searchResultType.handleSearchText(e.target.value),
    },
  },
  {
    name: 'alert',
    value: alertIdentifier ?? '',
    textFieldProps: {
      label: 'Alerta',
    },
    InputProps: {
      readOnly: true,
    },
  },
  {
    name: 'es_insumo',
    formControlProps: { label: 'Es insumo' },
    type: 'switch',
    defaultValue: false,
  },
  {
    name: 'description',
    label: 'Descripción',
    multiline: true,
    minRows: 3,
    maxRows: 5,
    space: 12,
  },
]
