import { TitleAlerts, TreasuryContainer } from '@/app/applications/components'
import { Box } from '@mui/material'
import { TableOPs } from '../components'
import { useGridApiRef } from '@mui/x-data-grid-premium'
import { useStoreState } from 'easy-peasy'

const ViewTreasuryByGroup = ({
  data,
  columns,
  loading,
  generateSpreadSheet,
  model,
  setModel,
  idGroup,
}) => {
  const apiRef = useGridApiRef()
  const paymentOrders = useStoreState((state) => state.paymentOrdersModel.paymentOrders)

  return (
    <TreasuryContainer
      apiRef={apiRef}
      generateSpreadSheet={generateSpreadSheet}
      idGroup={idGroup}
    >
      <Box mt={2}>
        <TitleAlerts
          title='Lista de ordenes de pago'
          backpath='/applications'
        />
        <Box
          backgroundColor='backgroundGrey1'
          p={2}
        >
          <TableOPs
            apiRef={apiRef}
            rows={data ?? []}
            columns={columns ?? []}
            loading={loading}
            paymentOrders={paymentOrders}
            paginationModel={model}
            handlePaginationModelChange={(model) => {
              setModel(model)
            }}
            idGroup={idGroup}
          />
        </Box>
      </Box>
    </TreasuryContainer>
  )
}

export default ViewTreasuryByGroup
