import { ClassicIconButton, MagicString, formatToLocaleDate } from '@/lib'
import { copyClipboard } from '@/lib/funcs/copyData'
import { ContentCopyOutlined } from '@mui/icons-material'
import { Typography, Box } from '@mui/material'

const useInfoCards = ({ info }) => {
  const additionalData = info?.processData?.additionalData

  const valuesToAdditionaData = {
    incidentReporting: 'Hechos Denuncia',
    incidentDate: 'Fecha de registro',
  }

  const newInfoToShow =
    additionalData
      ?.filter?.((data) => data.id === 'incidentReporting' || data.id === 'incidentDate')
      ?.map?.((data) => {
        return {
          title: valuesToAdditionaData[data.id],
          description:
            data?.id === 'incidentDate' ? formatToLocaleDate(data?.value) : data?.value ?? '',
        }
      }) || []

  const processData = [
    {
      title: 'Número de proceso',
      description: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>{info?.identifier ?? ''}</Typography>

          <ClassicIconButton
            onClick={() => copyClipboard(info?.identifier)}
            aria-label='Copy'
            color='primary'
          >
            <ContentCopyOutlined />
          </ClassicIconButton>
        </Box>
      ),
    },
    { title: 'Tipo de proceso', description: info?.ProcessType?.name ?? '' },
    {
      title: 'Fecha de inicio',
      description: formatToLocaleDate(info?.createdAt) ?? 'Error al obtener la fecha.',
    },
    { title: 'Estado', description: MagicString.STATUS[info?.status] ?? '' },

    // eslint-disable-next-line no-unsafe-optional-chaining
    ...newInfoToShow?.values?.(),
  ]
  if (info?.inspectionPlanData) {
    processData.push({
      title: 'Programa fiscalización de origen',
      description: info?.inspectionPlanData?.identifier ?? '',
    })
    processData.push({
      title: 'Observación Programa fiscalización de origen',
      description: info?.inspectionPlanData?.observation ?? '',
    })
  }
  if (info?.officeExecData) {
    processData.push({
      title: 'Dependencia a cargo',
      description: info?.officeExecData?.name ?? '',
    })
  }

  const datosContribuyente = [
    {
      title: 'Código',
      description: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>{info?.processData?.taxPayerData?.codigo ?? ''}</Typography>

          <ClassicIconButton
            onClick={() => copyClipboard(info?.processData?.taxPayerData?.codigo)}
            aria-label='Copy'
            color='primary'
          >
            <ContentCopyOutlined />
          </ClassicIconButton>
        </Box>
      ),
    },
    {
      title: 'Dirección de cobro',
      description: info?.processData?.taxPayerData?.dirCobro ?? '',
    },
    {
      title: 'Dirección',
      description: info?.processData?.taxPayerData?.direccion ?? '',
    },
    {
      title: 'Matrícula',
      description: info?.processData?.taxPayerData?.matricula ?? '',
    },
    {
      title: 'Nombre Propietario',
      description: info?.processData?.taxPayerData?.nombreProp ?? '',
    },
    {
      title: 'Periodo',
      description: info?.processData?.taxPayerData?.periodoInicio ?? '',
    },
  ]

  return {
    processData,
    datosContribuyente,
  }
}

export default useInfoCards
