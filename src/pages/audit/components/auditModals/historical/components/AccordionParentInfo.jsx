import { CustomAccordion } from '@/lib'
import { History } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'

const AccordionParentInfo = ({ ParentProcess, handleShowHistory }) => {
  return (
    <CustomAccordion
      title='Proceso padre'
      defaultExpanded={true}
    >
      {ParentProcess ? (
        <div className='flex flex-col xs:flex-row align-middle backgroundwhite1 p-4 rounded-md'>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            flexGrow={1}
            alignItems='center'
            spacing={2}
          >
            <Typography variant='body1'>
              <strong>Identificador:</strong> {ParentProcess?.identifier}
            </Typography>
            <Typography variant='body1'>
              <strong>Tipo de proceso:</strong> {ParentProcess?.ProcessType?.name}
            </Typography>
          </Stack>
          <Button
            color='primary'
            size='small'
            sx={{ minWidth: '100px', mt: { xs: 2, sm: 0 } }}
            onClick={handleShowHistory(ParentProcess.id)}
          >
            Ver historial
            <History sx={{ ml: 2 }} />
          </Button>
        </div>
      ) : (
        <Typography>No hay proceso padre</Typography>
      )}
    </CustomAccordion>
  )
}

export default AccordionParentInfo
