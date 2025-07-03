import { MenuTreasury, MobileMenuOptions } from '.'
import { SearchTable, SideBar } from '@/lib'
import { Box, Button, useMediaQuery } from '@mui/material'
import { HeaderOPs } from '../treasury/[idGroup]/components'
import { greyContainer } from '../treasury/styles'
import { useNavigate } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useForm } from 'react-hook-form'
import { useTheme } from '@emotion/react'

const TreasuryContainer = ({ apiRef, generateSpreadSheet, idGroup, children }) => {
  const paymentOrderSearchText = useStoreState(
    (state) => state.paymentOrdersModel.paymentOrderSearchText
  )
  const handlePaymentOrderSearchText = useStoreActions(
    (actions) => actions.paymentOrdersModel.handlePaymentOrderSearchText
  )
  const cleaPaymentOrderSearchText = useStoreActions(
    (actions) => actions.paymentOrdersModel.cleaPaymentOrderSearchText
  )

  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'))

  const { handleSubmit } = useForm()
  const navigate = useNavigate()

  const clearSearch = () => {
    cleaPaymentOrderSearchText()
    navigate(`/applications/treasury`)
  }
  const onSubmit = () => {
    if (paymentOrderSearchText) {
      navigate(`/applications/treasury?q=${paymentOrderSearchText}`)
    } else {
      navigate(`/applications/treasury`)
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      {!isMediumScreen && (
        <MobileMenuOptions>
          <MenuTreasury />
        </MobileMenuOptions>
      )}
      <Box
        sx={greyContainer}
        mb={2}
        display='flex'
        justifyContent='space-between'
      >
        <SearchTable
          width='85%'
          label='Buscar orden de pago'
          searchText={paymentOrderSearchText}
          onChange={handlePaymentOrderSearchText}
          clearSearch={clearSearch}
          InputLabelProps={{ sx: { fontSize: '0.9rem' } }}
        />
        <Button
          variant='contained'
          type='submit'
          sx={{ width: '12%', maxWidth: '200px' }}
        >
          Buscar
        </Button>
      </Box>
      <Box display='flex'>
        <SideBar>
          <MenuTreasury />
        </SideBar>
        <Box
          flexGrow={1}
          ml={2}
          display='flex'
          flexDirection='column'
          overflow='hidden'
        >
          <Box
            sx={greyContainer}
            mt={2}
          >
            <HeaderOPs
              apiRef={apiRef}
              generateSpreadSheet={generateSpreadSheet}
              idGroup={idGroup}
            />
          </Box>
          <Box
            width='100%'
            flexGrow={1}
            overflow='auto'
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TreasuryContainer
