import {
  ClassicIconButton,
  MagicString,
  convertKeyToTitle,
  formatColombianMoney,
  formatDateToCustomString,
  formatToLocaleDate,
  formatToLocaleTimeString,
  isDate,
  isMoneyValue,
  useQueryDynamicApi,
} from '@/lib'
import { copyClipboard } from '@/lib/funcs/copyData'
import { ContentCopyOutlined, Visibility } from '@mui/icons-material'
import { Typography, Box } from '@mui/material'
import { useEffect, useState } from 'react'

const useInfoCards = ({ info, setIsViewingAlert }) => {
  const { data: parentProcess, isLoading } = useQueryDynamicApi({
    baseKey: 'urlProcess',
    url: `/processes/${info?.idParentProcess}`,
    isCompanyRequest: true,
    enabled: !!info?.idParentProcess,
  })

  const additionalData = info?.processData?.additionalData

  const [sigedocInfo, setSigedocInfo] = useState([])

  const foundData =
    additionalData?.SIGEDOCfechaRadicacion && additionalData?.SIGEDOCcodigoDeSeguimiento

  const sigedocFile = `data:image/png;base64,${additionalData?.archivo}`

  const valuesToAdditionaData = {
    incidentReporting: 'Hechos Denuncia',
    incidentDate: 'Fecha de registro',
  }

  const infoProcessPerformanceResults = info?.processData?.processPerformanceResults
    ? Object.keys(info.processData.processPerformanceResults)
        .filter((key) => key === key.toUpperCase())
        .map((key) => {
          const value = info?.processData?.processPerformanceResults?.[key]
          return {
            title: convertKeyToTitle(key),
            description: isDate(value)
              ? formatDateToCustomString(value)
              : isMoneyValue(value)
              ? formatColombianMoney(value)
              : value ?? 'No se encontró información registrada',
          }
        })
    : []
  const solicitudPptalData = [
    {
      title: 'Prefijo',
      description: info?.processData?.solicitudPptalData?.prefijo ?? '',
    },
    {
      title: 'Nro. Doc',
      description: info?.processData?.solicitudPptalData?.nrodoc ?? '',
    },
    {
      title: 'Concepto',
      description: info?.processData?.solicitudPptalData?.concepto ?? '',
    },
  ]
  const disponibilidadPptalData = [
    {
      title: 'Prefijo',
      description: info?.processData?.disponibilidadPptalData?.prefijo ?? '',
    },
    {
      title: 'Nro. Doc',
      description: info?.processData?.disponibilidadPptalData?.nrodoc ?? '',
    },
    {
      title: 'Concepto',
      description: info?.processData?.disponibilidadPptalData?.concepto ?? '',
    },
  ]
  const compromisoPptalData = [
    {
      title: 'Prefijo',
      description: info?.processData?.compromisoPptalData?.prefijo ?? '',
    },
    {
      title: 'Nro. Doc',
      description: info?.processData?.compromisoPptalData?.nrodoc ?? '',
    },
    {
      title: 'Concepto',
      description: info?.processData?.compromisoPptalData?.concepto ?? '',
    },
    {
      title: 'Identificación contratista',
      description: info?.processData?.compromisoPptalData?.identificacion ?? '',
    },
    {
      title: 'Nombre contratista',
      description: info?.processData?.compromisoPptalData?.nombreCompletoTercero ?? '',
    },
  ]
  const solCompromisoPptalData = [
    {
      title: 'Prefijo',
      description: info?.processData?.solCompromisoPptalData?.prefijo ?? '',
    },
    {
      title: 'Nro. Doc',
      description: info?.processData?.solCompromisoPptalData?.nrodoc ?? '',
    },
    {
      title: 'Concepto',
      description: info?.processData?.solCompromisoPptalData?.concepto ?? '',
    },
    {
      title: 'Identificación contratista',
      description: info?.processData?.solCompromisoPptalData?.identificacion ?? '',
    },
    {
      title: 'Nombre contratista',
      description: info?.processData?.solCompromisoPptalData?.nombreCompletoTercero ?? '',
    },
  ]
  const infoThird = [
    {
      title: 'Nombre tercero',
      description: info?.processData?.thirdData?.nombreCompletoTercero ?? '',
    },
    {
      title: 'Tipo tercero',
      description: info?.processData?.thirdData?.terceroType ?? '',
    },
    {
      title: 'Identificación tercero',
      description: info?.processData?.thirdData?.tercero ?? '',
    },
  ]
  const estadoDescriptions = {
    V: 'Vigente',
    A: 'Anulado',
    X: 'Aprobado',
    F: 'En planilla',
    P: 'Pagada',
  }
  const infoPayFormData = [
    {
      title: 'Número de Planilla',
      description: info?.processData?.payFormData?.planilla ?? '',
    },
    {
      title: 'Fecha Generación',
      description: info?.processData?.payFormData?.fechaPlanilla
        ? formatDateToCustomString(info?.processData?.payFormData?.fechaPlanilla)
        : '',
    },
    {
      title: 'Banco',
      description: info?.processData?.payFormData?.nomBanco ?? '',
    },
    {
      title: 'Cuenta de Giro',
      description: info?.processData?.payFormData?.nroFideicomiso ?? '',
    },
    {
      title: 'Sector',
      description: info?.processData?.payFormData?.clase ?? '',
    },
    {
      title: 'Descripción',
      description: info?.processData?.payFormData?.descripcion ?? '',
    },
  ]
  const infoPayOrder = [
    {
      title: 'Tipo',
      description: info?.processData?.payOrderData?.tipo ?? '',
    },
    {
      title: 'Nro Orden Pago',
      description: info?.processData?.payOrderData?.nrodoc ?? '',
    },
    {
      title: 'Fecha de creación',
      description: info?.processData?.payOrderData?.fecha
        ? formatToLocaleTimeString(info?.processData?.payOrderData?.fecha)
        : '',
    },
    {
      title: 'Concepto',
      description: info?.processData?.payOrderData?.concepto ?? '',
    },
    {
      title: 'Valor',
      description: info?.processData?.payOrderData?.valor
        ? formatColombianMoney(info?.processData?.payOrderData?.valor)
        : '',
    },
    {
      title: 'Estado',
      description: estadoDescriptions[info?.processData?.payOrderData?.estado] || '',
    },
    {
      title: 'Tipo tercero',
      description: info?.processData?.payOrderData?.terceroType ?? '',
    },
    {
      title: 'Identificación tercero',
      description: info?.processData?.payOrderData?.tercero ?? '',
    },
    {
      title: 'Nombre tercero',
      description: info?.processData?.payOrderData?.nombreCompletoTercero ?? '',
    },
    {
      title: 'Clase de pago',
      description: info?.processData?.payOrderData?.clasePago ?? '',
    },
  ]

  const infoPayEmpData = [
    {
      title: 'Tipo',
      description: info?.processData?.payOrderEmpData?.tipo ?? '',
    },
    {
      title: 'Nro Orden Pago',
      description: info?.processData?.payOrderEmpData?.nrodoc ?? '',
    },
    {
      title: 'Fecha de creación',
      description: info?.processData?.payOrderEmpData?.fecha
        ? formatToLocaleTimeString(info?.processData?.payOrderEmpData?.fecha)
        : '',
    },
    {
      title: 'Concepto',
      description: info?.processData?.payOrderEmpData?.concepto ?? '',
    },
    {
      title: 'Valor',
      description: info?.processData?.payOrderEmpData?.valor
        ? formatColombianMoney(info?.processData?.payOrderEmpData?.valor)
        : '',
    },
    {
      title: 'Estado',
      description: estadoDescriptions[info?.processData?.payOrderEmpData?.estado] || '',
    },
    {
      title: 'Tipo tercero',
      description: info?.processData?.payOrderEmpData?.terceroType ?? '',
    },
    {
      title: 'Identificación tercero',
      description: info?.processData?.payOrderEmpData?.tercero ?? '',
    },
    {
      title: 'Nombre tercero',
      description: info?.processData?.payOrderEmpData?.nombreCompletoTercero ?? '',
    },
    {
      title: 'Clase de pago',
      description: info?.processData?.payOrderEmpData?.clasePago ?? '',
    },
  ]

  const infoPayDescuentoData = [
    {
      title: 'Tipo',
      description: info?.processData?.payOrderDescuentoData?.tipo ?? '',
    },
    {
      title: 'Nro Orden Pago',
      description: info?.processData?.payOrderDescuentoData?.nrodoc ?? '',
    },
    {
      title: 'Fecha de creación',
      description: info?.processData?.payOrderDescuentoData?.fecha
        ? formatToLocaleTimeString(info?.processData?.payOrderDescuentoData?.fecha)
        : '',
    },
    {
      title: 'Concepto',
      description: info?.processData?.payOrderDescuentoData?.concepto ?? '',
    },
    {
      title: 'Valor',
      description: info?.processData?.payOrderDescuentoData?.valor
        ? formatColombianMoney(info?.processData?.payOrderDescuentoData?.valor)
        : '',
    },
    {
      title: 'Estado',
      description: estadoDescriptions[info?.processData?.payOrderDescuentoData?.estado] || '',
    },
    {
      title: 'Tipo tercero',
      description: info?.processData?.payOrderDescuentoData?.terceroType ?? '',
    },
    {
      title: 'Identificación tercero',
      description: info?.processData?.payOrderDescuentoData?.tercero ?? '',
    },
    {
      title: 'Nombre tercero',
      description: info?.processData?.payOrderDescuentoData?.nombreCompletoTercero ?? '',
    },
    {
      title: 'Clase de pago',
      description: info?.processData?.payOrderDescuentoData?.clasePago ?? '',
    },
  ]

  const infoContract = [
    {
      title: 'Número interno',
      description: info?.processData?.contractData?.nroContrato ?? '',
    },
    {
      title: 'Número de contrato',
      description: info?.processData?.contractData?.nrodoc ?? '',
    },
    {
      title: 'Tipo de contrato',
      description: info?.processData?.contractData?.tipoContrato ?? '',
    },
    {
      title: 'Nombre del contratista',
      description: info?.processData?.contractData?.nombreCompletoTercero ?? '',
    },
    {
      title: 'Identificación del contratista',
      description: info?.processData?.contractData?.tercero ?? '',
    },
    {
      title: 'Fecha de firma',
      description: info?.processData?.contractData?.fechaFirma
        ? formatToLocaleTimeString(info.processData.contractData.fechaFirma)
        : '',
    },
    {
      title: 'Fecha de inicio',
      description: info?.processData?.contractData?.fechaInicio
        ? formatToLocaleTimeString(info.processData.contractData.fechaInicio)
        : '',
    },

    {
      title: 'Dependencia',
      description: info?.processData?.contractData?.nomDependencia ?? '',
    },
    {
      title: 'Prefijo / Vigencia',
      description: info?.processData?.contractData?.prefijo ?? '',
    },
    {
      title: 'Objeto del contrato',
      description: info?.processData?.contractData?.descripcion ?? '',
    },
  ]

  const newInfoToShow =
    additionalData
      ?.filter?.((data) => data.id === 'incidentReporting' || data.id === 'incidentDate')
      ?.map((data) => {
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
    { title: 'Dependencia', description: info?.originOfficeData?.name ?? '' },

    { title: 'Tipo de proceso', description: info?.ProcessType?.name ?? '' },
    {
      title: 'Fecha de inicio',
      description: formatToLocaleDate(info?.createdAt) ?? 'Error al obtener la fecha.',
    },
    { title: 'Estado', description: MagicString.STATUS[info?.status] ?? '' },

    // eslint-disable-next-line no-unsafe-optional-chaining
    ...newInfoToShow?.values?.(),
  ]

  const dataAlert = [
    {
      title: 'Nombre modelo',
      description:
        info?.processData?.cgrAlertas?.nombreModelo ?? 'No se encontró información registrada',
    },
    {
      title: 'Identificador',
      description: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>
            {info?.processData?.cgrAlertas?.identificador ??
              'No se encontró información registrada'}
          </Typography>

          <ClassicIconButton
            onClick={() => setIsViewingAlert(true)}
            aria-label='Copy'
            color='primary'
          >
            <Visibility />
          </ClassicIconButton>
        </Box>
      ),
    },
    {
      title: 'Nombre categoría',
      description:
        info?.processData?.cgrAlertas?.nombreCategoria ?? 'No se encontró información registrada',
    },
    {
      title: 'Nombre criterio',
      description:
        info?.processData?.cgrAlertas?.nombreCriterio ?? 'No se encontró información registrada',
    },
    {
      title: 'Identificador DIARI',
      description:
        info?.processData?.cgrAlertas?.identificadorDIARI ??
        'No se encontró información registrada',
    },
  ]
  const assignedTaskInfo = [
    {
      title: 'Nombre',
      description: `${info?.processActors?.TERCERO_CONTRATISTA?.[0].firstName ?? ''} ${
        info?.processActors?.TERCERO_CONTRATISTA?.[0].lastName ?? ''
      }`,
    },
    {
      title: 'Tipo de documento',
      description:
        MagicString.TYPEDOC[info?.processActors?.TERCERO_CONTRATISTA?.[0].documentType] ?? '',
    },
    {
      title: 'Número de documento',
      description: info?.processActors?.TERCERO_CONTRATISTA?.[0].documentId ?? '',
    },
  ]
  const columnsEntity = [
    {
      field: 'entity',
      headerName: 'Entidad',
      flex: 1,
      valueGetter: (params) => `${params?.row?.EntityData?.name ?? ''}`,
    },
    {
      field: 'assignedTo',
      headerName: 'Enlace',
      flex: 1,
      valueGetter: (params) =>
        `${params?.row?.userData?.firstName ?? ''} ${params?.row?.userData?.lastName ?? ''}`,
    },
  ]
  const columnsActivity = [
    {
      field: 'name',
      headerName: 'Nombre de la actividad',
      width: 200,
      valueGetter: (params) => `${params?.row?.Task?.name ?? ''}`,
    },
    {
      field: 'assignedTo',
      headerName: 'Usuario asignado',
      width: 200,
      valueGetter: (params) =>
        params?.row?.assignedToUserData
          ? `${`${params?.row?.assignedToUserData?.firstName ?? ''} ${
              params?.row?.assignedToUserData?.lastName ?? ''
            }`}`
          : `${params?.row?.userOfficeData?.depencyName ?? ''}`,
    },
    {
      field: 'notifiedAt',
      headerName: 'Fecha notificación',
      width: 200,
      valueGetter: (params) => `${formatToLocaleDate(params?.row?.notifiedAt) ?? ''}`,
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 200,
      valueGetter: (params) => `${MagicString.STATUS[params?.row?.status] ?? ''}`,
    },
    {
      field: 'description',
      headerName: 'Descripción',
      width: 200,
      valueGetter: (params) => `${params?.row?.description ?? ''}`,
    },
  ]

  const getInfoSigeDoc = (info) => {
    const sigedoc = info?.processData?.additionalData

    return [
      {
        title: 'Fecha radicacion',
        description: formatToLocaleDate(sigedoc?.SIGEDOCfechaRadicacion ?? ''),
      },
      { title: 'Codigo de Seguimiento', description: sigedoc?.SIGEDOCcodigoDeSeguimiento ?? '' },
      // { title: 'Previsualizar Sigedoc', description: 'previewSIGEDOC', file: sigedoc?.archivo },
    ]
  }

  useEffect(() => {
    if (foundData) {
      const infoSigeDoc = getInfoSigeDoc(info)

      setSigedocInfo(infoSigeDoc)
    }
  }, [foundData, info])

  const [parentProcessInfo, setParentProcessInfo] = useState([])

  useEffect(() => {
    if (info?.idParentProcess && parentProcess?.success) {
      const infoSigeDoc = getInfoSigeDoc(parentProcess?.data[0])

      setParentProcessInfo([
        {
          title: 'Nombre de tipo proceso',
          description: parentProcess?.data[0]?.ProcessType?.name ?? '',
        },
        { title: 'Número de proceso', description: parentProcess?.data[0]?.identifier },
        ...infoSigeDoc,
      ])
    }
  }, [info, parentProcess])

  return {
    foundData,
    processData,
    assignedTaskInfo,
    columnsActivity,
    columnsEntity,
    sigedocInfo,
    isLoading,
    parentProcessInfo,
    dataAlert,
    sigedocFile,
    infoProcessPerformanceResults,
    infoContract,
    infoThird,
    infoPayOrder,
    infoPayFormData,
    solicitudPptalData,
    disponibilidadPptalData,
    compromisoPptalData,
    infoPayEmpData,
    infoPayDescuentoData,
    solCompromisoPptalData,
  }
}

export default useInfoCards
