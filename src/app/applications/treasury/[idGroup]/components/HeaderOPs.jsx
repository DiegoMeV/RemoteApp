import { Badge, Box, Button, Grid, Typography } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { useEffect, useState } from 'react'

const HeaderOPs = ({ apiRef, generateSpreadSheet, idGroup }) => {
  const paymentOrders = useStoreState((state) => state.paymentOrdersModel.paymentOrders)
  const [filteredOrders, setFilteredOrders] = useState([])

  useEffect(() => {
    if (paymentOrders && idGroup) {
      const ordersArray = Object.entries(paymentOrders)
        .filter(([key]) => key === idGroup)
        .flatMap(([, values]) => values)
      setFilteredOrders(ordersArray)
    }
  }, [paymentOrders, idGroup])

  const handleGenerateSpreadSheet = () => {
    const paymentOrders = apiRef.current.getSelectedRows()
    const paymentOrdersArray = Array.from(paymentOrders?.values())
    const paymentOrdersBody = paymentOrdersArray.map((row) => ({
      orden: row?.orden,
      recurso: row?.recurso,
      clase: row?.clase,
    }))

    generateSpreadSheet({ body: { payOrders: paymentOrdersBody } })
  }
  return (
    <Grid
      container
      p={3}
      border='1px solid #ccc'
      borderRadius='10px'
      boxShadow='0px 4px 4px -2px rgba(0, 0, 0, 0.2)'
      bgcolor='backgroundWhite1'
    >
      <Grid
        item
        xs={12}
        md={6}
      >
        <Typography
          variant='body1'
          color='secondary'
        >
          Para generar la planilla, es indispensable que los radicados estén en estado{' '}
          <strong>&quot;Completado&quot;</strong>y las ordenes de pago en estado{' '}
          <strong>&quot;Aprobado&quot;</strong>
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        container
        justifyContent='flex-end'
        alignItems='center'
      >
        <Button
          variant='contained'
          sx={{ display: 'flex', alignItems: 'center' }}
          onClick={() => handleGenerateSpreadSheet()}
        >
          Generar planilla
          <Box sx={{ ml: 2 }}>
            <Badge
              badgeContent={filteredOrders.length || 0}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: 'white',
                  color: 'primary.main',
                  borderRadius: '50%',
                  padding: '0 6px',
                  marginLeft: '8px',
                },
              }}
            />
          </Box>
        </Button>
      </Grid>
    </Grid>
  )
}

export default HeaderOPs
