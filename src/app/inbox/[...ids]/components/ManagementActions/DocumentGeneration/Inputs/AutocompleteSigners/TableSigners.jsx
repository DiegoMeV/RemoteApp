import { Box } from '@mui/material'
import { DataGridPremium } from '@mui/x-data-grid-premium'
import { columnsSigners } from '../../../constants'
import { generateRowsSigners } from '../../../funcs'

const TableSigners = ({ signersRows, height }) => {
  const rows = generateRowsSigners({ signersRows })

  return (
    <Box sx={{ height: height ?? 300 }}>
      <DataGridPremium
        columns={columnsSigners ?? []}
        rows={rows ?? []}
        sx={{ minHeight: '300px' }}
      />
    </Box>
  )
}

export default TableSigners
