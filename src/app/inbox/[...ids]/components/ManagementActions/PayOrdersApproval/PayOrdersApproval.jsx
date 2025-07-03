import { Box } from '@mui/material'
import { isEmpty } from '@/libV4'
import ElementPayOrder from './ElementPayOrder'

const PayOrdersApproval = ({ processInfo, elementData, ids, idAction, refetchElementActions }) => {
  const callApiUrl = elementData?.[0]?.callAPIURL ?? null

  const payOrderData = processInfo?.[0]?.processData?.payOrderData
  const payOrderEmpData = processInfo?.[0]?.processData?.payOrderEmpData
  const payOrderDescuentoData = processInfo?.[0]?.processData?.payOrderDescuentoData

  const arrayToShowInfo = [
    {
      title: 'Datos de la orden de pago',
      data: payOrderData,
    },
    {
      title: 'Datos de la orden de pago de empleados',
      data: payOrderEmpData,
    },
    {
      title: 'Datos de la orden de pago de descuento',
      data: payOrderDescuentoData,
    },
  ]

  return (
    <Box
      p={2}
      bgcolor={'backgroundWhite1'}
      borderRadius={3}
      display='flex'
      flexDirection='column'
      gap={2}
    >
      {
        // TODO : download pay order by docs
        /* <Button
        variant='outlined'
        color='secondary'
        sx={{ width: '20%', alignSelf: 'flex-end', boxShadow: 3 }}
        endIcon={
          <img
            style={{ width: '25px', height: '25px' }}
            src='/assets/svg/PDF.svg'
            alt='PDF'
          />
        }
      >
        Orden Pago
      </Button> */
      }

      {arrayToShowInfo?.map((item, index) => {
        if (!isEmpty(item.data)) {
          return (
            <ElementPayOrder
              key={index}
              item={item}
              callApiUrl={callApiUrl}
              elementData={elementData}
              ids={ids}
              idAction={idAction}
              refetchElementActions={refetchElementActions}
            />
          )
        }
      })}
    </Box>
  )
}

export default PayOrdersApproval
