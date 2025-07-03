import { AutocompleteSelectDG, ClassicIconButton } from '@/lib'
import { Delete, Edit } from '@mui/icons-material'

export const inputsContract = [
  {
    name: 'tipoContrato',
    label: 'Modalidad de contratación',
    space: 4,
    required: true,
    type: 'autoCompleteSelect',
  },
  { name: '', label: 'Crear', space: 4, type: 'button' },
  { name: 'numeroContrato', label: 'Número de contrato', space: 4 },
  { name: 'valor', label: 'Valor', space: 3 },
  { name: 'fechaInicio', label: 'Fecha de inicio', space: 3, type: 'date' },
  { name: 'fechaFin', label: 'Fecha de terminación', space: 3, type: 'date' },
  { name: 'fechaSuspension', label: 'Fecha de suspensión', space: 3, type: 'date' },
  { name: 'entidad', label: 'Entidad', space: 4, type: 'autoCompleteSelect' },
  { name: 'contratista', label: 'Contratista', space: 4, type: 'autoCompleteSelect' },
  { name: '', label: 'Crear Tercero', space: 4, type: 'button' },
  { name: 'observacion', label: 'Observación', type: 'multiline' },
]

const columnOption = {
  field: 'options',
  headerName: '',
  width: 120,
  renderCell: () => {
    return (
      <>
        <ClassicIconButton>
          <Edit />
        </ClassicIconButton>
        <ClassicIconButton>
          <Delete />
        </ClassicIconButton>
      </>
    )
  },
}

export const columnsRegions = [
  {
    field: 'region',
    headerName: 'Región',
    editable: true,
    width: 200,
    renderEditCell: (params) => {
      return <AutocompleteSelectDG {...params} />
    },
  },
  {
    field: 'departamento',
    headerName: 'Departamento',
    editable: true,
    width: 200,
    renderEditCell: (params) => {
      return <AutocompleteSelectDG {...params} />
    },
  },
  {
    field: 'municipio',
    headerName: 'Municipio',
    editable: true,
    width: 200,
    renderEditCell: (params) => {
      return <AutocompleteSelectDG {...params} />
    },
  },
  { ...columnOption },
]

export const labelAmendment = {
  ADICION: { label: 'Adiciones', labelButton: 'Adicion' },
  REDUCCION: { label: 'Reducciones', labelButton: 'Reducción' },
  CESION: { label: 'Cesiones', labelButton: 'Cesión' },
  PRORROGA: { label: 'Prórrogas', labelButton: 'Prórroga' },
  SUSPENSION: { label: 'Suspensiones', labelButton: 'Suspensión' },
}
