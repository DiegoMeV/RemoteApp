import { TitleQrDoc } from '.'
import { Box, LinearProgress } from '@mui/material'
import { columnsTableSigners } from '../constants'
import { NoDataOverlay, getRowClassName, localeTextsEsp } from '@/lib'
import { useStoreState } from 'easy-peasy'
import { DataGridPremium } from '@mui/x-data-grid-premium'
import { containerDinamicAlertTable } from '@/app/applications/components/styles'
import { containerSigners } from '../styles'

const QrDocSigners = ({ rowsSigners, commentId }) => {
  const columnsSigners = columnsTableSigners

  const dark = useStoreState((state) => state.darkTheme.dark)

  return (
    <Box component='section'>
      <TitleQrDoc
        title='Firmas'
        fontSize='18px'
      />
      <Box
        component='article'
        sx={containerSigners}
      >
        <Box
          component='div'
          sx={{...containerDinamicAlertTable, padding: '15px'}}
        >
          <DataGridPremium
            rows={rowsSigners ?? []}
            columns={columnsSigners ?? []}
            getRowClassName={(params) => getRowClassName(dark, params)}
            rowSelectionModel={commentId ?? ''}
            pagination
            initialState={{
              pagination: { paginationModel: { pageSize: 50 } },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            localeText={localeTextsEsp}
            slots={{
              noRowsOverlay: NoDataOverlay,
              loadingOverlay: LinearProgress,
            }}
            sx={{ backgroundColor: 'backgroundWhite1', minHeight: '300px' }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default QrDocSigners
