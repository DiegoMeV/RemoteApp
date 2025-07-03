import { CustomAccordion, GenericTable } from '@/lib'
import { ClassicIconButton } from '@/libV4'
import { History } from '@mui/icons-material'
import { Box } from '@mui/material'

const AccordionChildProcess = ({
  relatedProcess,
  loadingRelatedProcesses,
  handleShowHistory,
  setIdentifier,
}) => {
  return (
    <CustomAccordion
      title='Procesos hijos'
      defaultExpanded={true}
    >
      <Box
        sx={{
          height: '500px',
        }}
      >
        <GenericTable
          rows={relatedProcess?.data?.[0]?.ChildProcesses ?? []}
          loading={loadingRelatedProcesses}
          columns={[
            {
              field: 'identifier',
              headerName: 'Identificador',
            },
            {
              field: 'typeProcess',
              headerName: 'Tipo de proceso',
              valueGetter: (params) => `${params?.row?.ProcessType?.name ?? ''}`,
            },
            {
              field: 'description',
              headerName: 'Descripción',
            },
            {
              field: 'options',
              headerName: '',
              renderCell: (params) => (
                <Box>
                  <ClassicIconButton
                    title='Ver historial'
                    placement='right'
                    onClick={() => {
                      handleShowHistory(params?.row.id)
                      setIdentifier(params?.row.identifier)
                    }}
                  >
                    <History />
                  </ClassicIconButton>
                </Box>
              ),
            },
          ]}
        />
      </Box>
    </CustomAccordion>
  )
}

export default AccordionChildProcess
