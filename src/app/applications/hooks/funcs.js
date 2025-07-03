import { Box } from '@mui/system'
import { EditOption, GenericChip } from '../components'
import { containerEditOptionAlertTable } from '../components/styles'

export const handleChange = (value, setSearchText) => {
  setSearchText(value)
}

const escapeRegExp = (value) => {
  return value ? value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : ''
}
const structureBlock = (row) => {
  return {
    id: row?.id ?? '',
    name: row?.nombre ?? '',
    description: row?.descripcion ?? '',
  }
}

export const convertInfoRowsBlocks = (rows, setCompleteRows, setFilteredRows) => {
  const getRows = rows?.data?.map((row) => {
    return structureBlock(row)
  })
  setCompleteRows(getRows ?? [])
  setFilteredRows(getRows ?? [])
}

export const searchRows = (searchText, completeRows, setFilteredRows) => {
  const searchRegex = new RegExp(escapeRegExp(searchText), 'i')
  const searchedRows = completeRows?.filter((row) => {
    return Object.keys(row).some((field) => {
      if (typeof row[field] === 'number' || typeof row[field] === 'string') {
        return searchRegex.test(row[field].toString())
      }
    })
  })
  setFilteredRows(searchedRows)
}

const structureModel = (row) => {
  return {
    id: row?.id ?? '',
    idModel: row?.id ?? '',
    name: row?.nombre ?? '',
    description: row?.descripcion ?? '',
    isActive: row?.activo ?? '',
  }
}

export const convertInfoRowsModels = (rows, setCompleteRows, setFilteredRows) => {
  const getRows = rows?.data?.map((row) => {
    return structureModel(row)
  })
  setCompleteRows(getRows ?? [])
  setFilteredRows(getRows ?? [])
}

const structureRegions = (row, index) => {
  return {
    id: row?.id ?? '',
    number: index + 1,
    name: row?.departamento_id ?? '',
  }
}

export const convertInfoRowsRegions = (rows, setCompleteRows, setFilteredRows) => {
  const getRows = rows?.data?.map((row, index) => {
    return structureRegions(row, index)
  })
  setCompleteRows(getRows ?? [])
  setFilteredRows(getRows ?? [])
}

const structureDependencies = (row) => {
  return {
    id: row?.id ?? '',
    name: row?.nombre ?? '',
    address: row?.direccion ?? '',
    phone: row?.telefono ?? '',
    isActive: row?.activo ?? '',
  }
}

export const convertInfoRowsDependencies = (rows, setCompleteRows, setFilteredRows) => {
  const getRows = rows?.data?.map((row) => {
    return structureDependencies(row)
  })
  setCompleteRows(getRows ?? [])
  setFilteredRows(getRows ?? [])
}

const structureContracts = (row) => {
  return {
    id: row?.id ?? '',
    number: row?.numero ?? '',
    typeContract: row?.tipo_contrato ?? '',
    contractor: row?.contratista ?? '',
    objContractor: row?.objeto_contratista ?? '',
    isActive: row?.activo ?? '',
  }
}

export const convertInfoRowsContracts = (rows, setCompleteRows, setFilteredRows) => {
  const getRows = rows?.data?.map((row) => {
    return structureContracts(row)
  })
  setCompleteRows(getRows ?? [])
  setFilteredRows(getRows ?? [])
}

export const columnsDependecies = [
  { field: 'name', headerName: 'Nombre', width: 200 },
  { field: 'address', headerName: 'Direccion', width: 200 },
  { field: 'phone', headerName: 'Telefono', width: 200 },
  {
    field: 'isActive',
    headerName: 'Estado',
    headerAlign: 'center',
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    renderCell: (params) => {
      return (
        <Box sx={containerEditOptionAlertTable}>
          <GenericChip params={params} />
        </Box>
      )
    },
  },
  {
    field: 'options',
    headerName: '',
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    headerAlign: 'center',
    renderHeader: () => '',
    renderCell: () => (
      <Box sx={containerEditOptionAlertTable}>
        <EditOption
          onClick={() => {
            // TODO: Implementar navigate(params.row.id)
          }}
        />
      </Box>
    ),
    hideable: false,
  },
]
