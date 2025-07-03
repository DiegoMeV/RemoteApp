import { formatColombianMoney, formatDateToCustomString } from '@/lib'
import {
  AttachMoney,
  DateRange,
  Escalator,
  NotificationsActive,
  PeopleAlt,
  Person,
  Public,
} from '@mui/icons-material'
import { Box } from '@mui/material'

export const cardsToResult = (infoExecutiveInfo) => {
  const executiveInfo = infoExecutiveInfo?.data?.[0]
  const findCoordinator = executiveInfo?.dataEquipoRegistro?.find((item) => {
    return item?.tipo === 'COORDINADOR'
  })

  return [
    {
      title: executiveInfo?.nombre_proyecto ?? 'No se encontró información registrada',
      gridConfig: { xs: 12 },
      display: 'center',
    },
    {
      title: 'Departamento',
      value: executiveInfo?.departamento ?? 'No se encontró información registrada',
      avatar: <Public />,
    },
    {
      title: 'Municipio',
      value: executiveInfo?.municipio ?? 'No se encontró información registrada',
      avatar: <Public />,
    },
    {
      title: 'Población beneficiada',
      value: executiveInfo?.beneficiarios ?? 'No se encontró información registrada',
      avatar: <PeopleAlt />,
    },
    {
      title: 'Contratante',
      value: executiveInfo?.contratante_ejecutor ?? 'No se encontró información registrada',
      avatar: <Person />,
    },
    {
      title: ' Contratista',
      value: executiveInfo?.contratista ?? 'No se encontró información registrada',
      avatar: <Person />,
    },
    {
      title: 'Coordinador(a)',
      value: `${findCoordinator?.dataUser?.firstName ?? 'No se encontró información registrada'} ${
        findCoordinator?.dataUser?.lastName ?? ''
      }`,
      avatar: <Person />,
    },
    {
      title: 'Fecha inicio del proyecto alertado',
      value: executiveInfo?.fecha_inicial_contrato_o_proyecto
        ? formatDateToCustomString(executiveInfo?.fecha_inicial_contrato_o_proyecto)
        : 'No se encontró información registrada',
      avatar: <DateRange />,
    },
    {
      title: 'Fecha finalización del proyecto alertado',
      value: executiveInfo?.fecha_finalizacion_inicial
        ? formatDateToCustomString(executiveInfo?.fecha_finalizacion_inicial)
        : 'No se encontró información registrada',
      avatar: <DateRange />,
    },
    {
      title: 'Fecha mesa de instalación ARI',
      value: executiveInfo?.fecha_mesa_instalacion
        ? formatDateToCustomString(executiveInfo?.fecha_mesa_instalacion)
        : 'No se encontró información registrada',
      avatar: <DateRange />,
    },
    {
      title: 'Fecha finalización del proyecto actual',
      value: executiveInfo?.fecha_actual_finalizacion
        ? formatDateToCustomString(executiveInfo?.fecha_actual_finalizacion)
        : 'No se encontró información registrada',
      avatar: <DateRange />,
    },
    {
      title: 'Fecha de liberación del informe',
      value: executiveInfo?.fecha_actualizada_fin_seguimiento
        ? formatDateToCustomString(executiveInfo?.fecha_actualizada_fin_seguimiento)
        : 'No se encontró información registrada',
      avatar: <DateRange />,
    },
    {
      title: 'Estado actual del proyecto',
      value: executiveInfo?.estado_seguimiento ?? 'No se encontró información registrada',
      avatar: <NotificationsActive />,
    },
    {
      title: 'Avance físico alertado',
      value: executiveInfo?.avance_fisico_alertado
        ? `${executiveInfo?.avance_fisico_alertado ?? ''}%`
        : 'No se encontró información registrada',
      avatar: <Escalator />,
    },
    {
      title: 'Avance físico actual',
      value: `${executiveInfo?.avance_fisico_mesa ?? 'No se encontró información registrada'}`,
      avatar: <Escalator />,
    },
    {
      title: 'Valor del proyecto',
      value: executiveInfo?.valor_alertado
        ? formatColombianMoney(executiveInfo?.valor_alertado)
        : 'No se encontró información registrada',
      avatar: <AttachMoney />,
    },
  ]
}

export const teamCards = (infoExecutiveInfo) => {
  const executiveInfo = infoExecutiveInfo?.data?.[0]
  const responsible = executiveInfo?.dataEquipoRegistro?.find((item) => {
    return item?.tipo === 'RESPONSABLE'
  })

  const auxiliaries = executiveInfo?.dataEquipoRegistro?.filter((item) => {
    return item?.tipo === 'AUXILIAR'
  })

  return [
    {
      title: 'Responsable',
      value: `${responsible?.dataUser?.firstName ?? 'No se encontró información registrada'} ${
        responsible?.dataUser?.lastName ?? ''
      }`,
      gridConfig: { xs: 12 },
      color: '#1EEDFC',
    },
    {
      title: 'Auxiliares',
      gridConfig: { xs: 12 },
      color: '#1EEDFC',
      value: (
        <>
          {auxiliaries?.length === 0 && 'No se encontró información registrada'}
          {auxiliaries?.map((auxiliary, index) => (
            <Box key={index}>
              {`${auxiliary?.dataUser?.firstName ?? ''} ${auxiliary?.dataUser?.lastName ?? ''} `}
            </Box>
          ))}
        </>
      ),
    },
  ]
}
