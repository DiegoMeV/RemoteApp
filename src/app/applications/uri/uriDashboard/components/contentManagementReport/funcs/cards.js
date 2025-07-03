import { formatColombianMoney, formatDateToCustomString } from '@/lib'
import {
  Article,
  AttachMoney,
  DateRange,
  Escalator,
  Group,
  Person,
  Public,
} from '@mui/icons-material'

export const cardsToResult = (infoRow) => {
  const executiveInfo = infoRow

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
      title: 'Contratante',
      value: executiveInfo?.contratante_ejecutor ?? 'No se encontró información registrada',
      avatar: <Person />,
    },
    {
      title: ' Contratista',
      value: executiveInfo?.contratante_ejecutor ?? 'No se encontró información registrada',
      avatar: <Person />,
    },
    {
      title: 'Sector',
      value: executiveInfo?.sector_alertado ?? 'No se encontró información registrada',
      avatar: <Group />,
    },
    {
      title: 'Fecha inicio del proyecto alertado',
      value: executiveInfo?.fecha_inicial_contrato_o_proyecto
        ? formatDateToCustomString(executiveInfo?.fecha_inicial_contrato_o_proyecto)
        : 'No se encontró información registrada',
      avatar: <DateRange />,
    },
    {
      title: 'Fecha finalización inicial',
      value: executiveInfo?.fecha_finalizacion_inicial
        ? formatDateToCustomString(executiveInfo?.fecha_finalizacion_inicial)
        : 'No se encontró información registrada',
      avatar: <DateRange />,
    },
    {
      title: 'Fecha finalización del Proyecto',
      value: executiveInfo?.fecha_actual_finalizacion
        ? formatDateToCustomString(executiveInfo?.fecha_actual_finalizacion)
        : 'No se encontró información registrada',
      avatar: <DateRange />,
    },
    {
      title: 'Población Beneficiada',
      value: executiveInfo?.beneficiarios ?? 'No se encontró información registrada',
      avatar: <DateRange />,
    },
    {
      title: 'Avance físico alertado',
      value: executiveInfo?.avance_fisico_alertado
        ? `${executiveInfo?.avance_fisico_alertado}%`
        : 'No se encontró información registrada',
      avatar: <Escalator />,
    },
    {
      title: 'Avance físico actual',
      value: executiveInfo?.avance_fisico_mesa
        ? `${executiveInfo?.avance_fisico_mesa}%`
        : 'No se encontró información registrada',
      avatar: <Escalator />,
    },
    {
      title: 'Valor alertado',
      value: executiveInfo?.valor_alertado
        ? formatColombianMoney(executiveInfo?.valor_alertado)
        : 'No se encontró información registrada',
      avatar: <AttachMoney />,
    },
    {
      title: 'Valor Resultado',
      value: executiveInfo?.valor_contrato_mesa
        ? formatColombianMoney(executiveInfo?.valor_contrato_mesa)
        : 'No se encontró información registrada',
      avatar: <AttachMoney />,
    },
    {
      title: 'Resultado',
      value: executiveInfo?.beneficio_seguimiento ?? 'No se encontró información registrada',
      avatar: <Article />,
      gridConfig: { xs: 12 },
    },
  ]
}
