import { Box, Button, Stack, Typography } from '@mui/material'
import { useApis, useXlsxProcess } from './funcs'
import { BackdropLoading } from '@/libV4'
import { LoadingMassive } from '@/app/audit/expedient/components'

const ExecutesOptions = ({
  form,
  idInspectionPlan,
  generateProcesses,
  queueInfo,
  getInspectionPlanQueue,
  getInspectionPlanJob,
}) => {
  const {
    downloadXLSXApi,
    genXLSXApi,
    createExecInspection,
    isLoadingCreateExecInspection,
    isLoadingXlsx,
  } = useApis({ idInspectionPlan, getInspectionPlanQueue, getInspectionPlanJob })

  const { handleFileChange, isLoadingMarkSubjects } = useXlsxProcess({ idInspectionPlan })
  const data = form.getValues()

  return (
    <div className='overflow-auto relative'>
      <Box
        bgcolor='backgroundGrey2'
        borderRadius='20px 20px 0 0'
        display='flex'
        justifyContent='center'
        alignItems='center'
        maxWidth='700px'
        padding={2}
        width='100%'
        m='auto'
        mb={0}
      >
        {['QUEUED', 'INPROGRESS', 'IN_PROGRESS'].includes(
          queueInfo?.[0]?.status || queueInfo?.[0]?.estado
        ) && <LoadingMassive queueInfo={queueInfo} />}
        <BackdropLoading
          loading={isLoadingXlsx || isLoadingCreateExecInspection || isLoadingMarkSubjects}
        />
        <Typography
          variant='h6'
          sx={{ color: 'primary.main', fontWeight: 'bold' }}
        >
          Opciones disponibles para ejecutar
        </Typography>
      </Box>
      <Box
        elevation={3}
        sx={{
          maxWidth: '700px',
          margin: 'auto',
          padding: 3,
          textAlign: 'center',
          borderRadius: '0 0 20px 20px',
          bgcolor: 'backgroundGrey1',
          width: '100%',
          mt: 0,
        }}
      >
        <Stack spacing={2}>
          <Button
            color='primary'
            variant='outlined'
            sx={{ bgcolor: 'backgroundWhite1' }}
            disabled={form?.watch('rowsCount') !== 0}
            onClick={() => createExecInspection()}
          >
            GENERAR MUESTRA
          </Button>
          <Button
            variant='outlined'
            color='primary'
            disabled={form?.watch('rowsCount') === 0}
            onClick={() => {
              if (data?.inspectionData?.idFileSubjects) {
                downloadXLSXApi({ qry: `${data?.inspectionData?.idFileSubjects}/documentos` })
                return
              }
              genXLSXApi()
            }}
            sx={{ bgcolor: 'backgroundWhite1', width: '100%' }}
          >
            {!data?.inspectionData?.idFileSubjects
              ? 'GENERAR LISTADO DE EXCEL'
              : 'DESCARGAR LISTADO DE EXCEL'}
          </Button>
          <Button
            variant='outlined'
            color='primary'
            component='label'
            sx={{ bgcolor: 'backgroundWhite1' }}
            disabled={form?.watch('rowsCount') === 0}
            fullWidth
          >
            MARCAR CONTRIBUYENTES (APROBACIÓN / RECHAZO)
            <input
              type='file'
              accept='.xlsx'
              hidden
              onChange={(event) => {
                handleFileChange(event)
                event.target.value = ''
              }}
            />
          </Button>

          <Button
            variant='outlined'
            color='primary'
            onClick={generateProcesses}
            disabled={form?.watch('rowsCount') === 0}
            sx={{ bgcolor: 'backgroundWhite1' }}
          >
            GENERAR EXPEDIENTES
          </Button>
        </Stack>
      </Box>
    </div>
  )
}

export default ExecutesOptions
