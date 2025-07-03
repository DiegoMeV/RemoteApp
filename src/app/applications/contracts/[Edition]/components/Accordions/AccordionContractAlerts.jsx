import {
  CustomAccordion,
  ErrorPage,
  GenericTable,
  resizeColumns,
  useListContractAlerts,
} from '@/lib'
import { Box } from '@mui/material'
import { useGridApiRef } from '@mui/x-data-grid-premium'
import { useEffect } from 'react'
import { columnsContractAlert } from '../../constants/columns'
import { useStoreActions } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

const AccordionContractAlerts = ({ idContract, openAccordion, handleOpenAccordion }) => {
  const apiRef = useGridApiRef()

  const navigate = useNavigate()

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const {
    data: contractAlerts,
    isLoading,
    isError,
  } = useListContractAlerts({
    qry: `?contratoId=${idContract}`,
    enabled: openAccordion && idContract !== 'new',
  })

  useEffect(() => {
    resizeColumns(apiRef, isLoading)
  }, [apiRef, isLoading, openAccordion])

  const columns = columnsContractAlert(setConfirmAlertProps, navigate)

  return (
    <CustomAccordion
      title='Información de alertas dónde está vinculado el contrato'
      expandedValue={openAccordion}
      onClickAccordion={handleOpenAccordion}
    >
      {isError ? (
        <ErrorPage />
      ) : (
        <Box
          sx={{
            height: '400px',
          }}
        >
          <GenericTable
            apiRef={apiRef}
            rows={contractAlerts?.data ?? []}
            loading={isLoading}
            columns={columns ?? []}
            sx={{ backgroundColor: 'backgroundWhite1' }}
          />
        </Box>
      )}
    </CustomAccordion>
  )
}

export default AccordionContractAlerts
