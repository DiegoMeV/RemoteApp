import { CustomSearchDatagrid, NoDataOverlay, localeTextsEsp } from '@/lib'
import { Box, LinearProgress } from '@mui/material'
import { DataGridPremium } from '@mui/x-data-grid-premium'
import { useStoreState } from 'easy-peasy'
import { containerDinamicAlertTable } from '../styles'
import { TitleAlerts } from '@/app/applications/components'

const ViewIdApplication = ({ columns, rows, loading, addNewData, title }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)

  const getRowClassName = (params) => {
    return params.indexRelativeToCurrentPage % 2 !== 0
      ? ''
      : dark === 'dark'
      ? 'colorRowDarkMode'
      : 'gray-row' // Asigna la clase CSS solo a las filas impares
  }
  return (
    <Box
      component='div'
      sx={containerDinamicAlertTable}
    >
      <TitleAlerts
        title={title}
        backpath='/applications'
      />
      <DataGridPremium
        rows={rows || []}
        columns={columns || []}
        loading={loading ?? false}
        getRowClassName={getRowClassName}
        localeText={localeTextsEsp}
        initialState={{
          pinnedColumns: {
            right: ['options'],
          },
        }}
        slots={{
          toolbar: CustomSearchDatagrid,
          noRowsOverlay: NoDataOverlay,
          loadingOverlay: LinearProgress,
        }}
        slotProps={{ toolbar: { buttonLabel: 'Agregar', onClick: addNewData } }}
        sx={{ backgroundColor: 'backgroundWhite1' }}
      />
    </Box>
  )
}

export default ViewIdApplication
