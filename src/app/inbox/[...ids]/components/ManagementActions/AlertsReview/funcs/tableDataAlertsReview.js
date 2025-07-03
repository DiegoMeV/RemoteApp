import { GridRowModes } from '@mui/x-data-grid-premium'
import { SelectDG, TextFieldEditingDG, formatToLocaleDate } from '@/lib'

import { OPTIONS_STATES_ALERTS } from '../const/constAlertsReview'
import { RenderCellAlertsReview } from '../components'
import { Box } from '@mui/material'

const tableDataAlertsReview = (rowModesModels, setRowModesModels) => {
  const handleSaveClick = (id) => {
    setRowModesModels({ ...rowModesModels, [id]: { mode: GridRowModes.View } })
  }

  const COLUMNS_ALERTS_REVIEW = [
    {
      field: 'identificador',
      headerName: 'Identificador',
      width: 250,
      cellClassName: 'align_cell_start',
    },
    {
      field: 'identificador_diari',
      headerName: 'Identificador DIARI',
      width: 250,
      cellClassName: 'align_cell_start',
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      width: 250,
      cellClassName: 'align_cell_start',
      valueGetter: (params) => {
        return `${formatToLocaleDate(params.value)}`
      },
    },
    {
      field: 'nameModel',
      headerName: 'Nombre del modelo',
      minWidth: 250,
      cellClassName: 'align_cell_start',
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 250,
      cellClassName: 'align_cell_component_start',
      editable: true,
      valueGetter: (params) => {
        return `${params.value}`
      },
      renderEditCell: (params) => {
        return (
          <SelectDG
            {...params}
            options={OPTIONS_STATES_ALERTS}
          />
        )
      },
    },
    {
      field: 'comentario',
      headerName: 'Comentarios',
      width: 500,
      editable: true,
      valueGetter: (params) => {
        return `${params.value}`
      },
      renderEditCell: (params) => {
        return (
          <Box
            px={2}
            width='100%'
          >
            <TextFieldEditingDG
              {...params}
              isMultiline={true}
            />
          </Box>
        )
      },
    },
    {
      field: 'options',
      headerName: '',
      width: 60,
      renderCell: ({ id }) => {
        return (
          <RenderCellAlertsReview
            handleSaveClick={handleSaveClick}
            id={id}
          />
        )
      },
    },
  ]

  return {
    columns: COLUMNS_ALERTS_REVIEW,
  }
}

export default tableDataAlertsReview
