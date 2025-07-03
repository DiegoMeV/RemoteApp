import { Box } from '@mui/material'
import { ChartContainer, ErrorPage, Loading } from '@/lib'
import { ProcessSection, ReportsSection, TaskSection } from '.'
import { useGetsPersonalInfo } from '../../func'
import { CustomAccordion, usePrivileges } from '@/libV4'
import { SummarizeOutlined, Assessment } from '@mui/icons-material'
import { ListRegistry } from '../listRegistry'

const ViewPersonalCharts = () => {
  const year = new Date().getFullYear()
  const {
    activitiesValues,
    processesStatus,
    processesByMonth,
    isLoading,
    isErrorActivities,
    isErrorProcecess,
  } = useGetsPersonalInfo(year)

  const privilegePersonalReportActivities = usePrivileges(
    'procesos.consola.personal_reporte_actividades'
  )
  const privilegePersonalReportViewCompanies = usePrivileges('procesos.reportes.ver_compania')
  const privilegePersonalReportViewDependencies = usePrivileges('procesos.reportes.ver_dependencia')
  const privilegePersonalReportViewPropios = usePrivileges('procesos.reportes.ver_propios')

  const viewListadoRadicados =
    privilegePersonalReportViewCompanies ||
    privilegePersonalReportViewDependencies ||
    privilegePersonalReportViewPropios

  return (
    <Box
      display='flex'
      flexDirection='column'
      rowGap='30px'
    >
      {privilegePersonalReportActivities && (
        <CustomAccordion
          icon={<SummarizeOutlined color='primary' />}
          titleSx={{ textTransform: 'none' }}
          title='Reporte de Actividades'
          titleVariant='h6'
          accordionSx={{
            borderRadius: 2,
          }}
        >
          <ReportsSection />
        </CustomAccordion>
      )}
      {viewListadoRadicados && (
        <CustomAccordion
          icon={<Assessment color='primary' />}
          titleSx={{ textTransform: 'none' }}
          title='Listado de radicados'
          titleVariant='h6'
          accordionSx={{
            borderRadius: 2,
          }}
        >
          <ListRegistry />
        </CustomAccordion>
      )}

      {isLoading ? (
        <Loading />
      ) : isErrorActivities ? (
        <ErrorPage />
      ) : (
        <ChartContainer title='Procesos activados'>
          <TaskSection activitiesValues={activitiesValues?.data} />
        </ChartContainer>
      )}
      {isErrorProcecess ? (
        <ErrorPage />
      ) : (
        <ProcessSection
          processesStatus={processesStatus?.data}
          processesByMonth={processesByMonth?.data?.[year]}
          isErrorProcecess={isErrorProcecess}
        />
      )}
    </Box>
  )
}

export default ViewPersonalCharts
