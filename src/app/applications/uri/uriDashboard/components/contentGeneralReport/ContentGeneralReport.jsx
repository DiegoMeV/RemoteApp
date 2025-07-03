import { useState } from 'react'
import {
  useAccordionsGeneralReport,
  useActiveAcctApi,
  useAlertDetail,
  useMonitoringByRegion,
  useSectorApi,
} from './funcs'
import AccordionDisplay from '../AccordionDisplay'
import { useForm } from 'react-hook-form'
import { useGetDataMaps } from '../../hooks'

const ContentGeneralReport = () => {
  const [expandedAccordions, setExpandedAccordions] = useState(['filtros', 'resultados'])
  const [qryParams, setQryParams] = useState('')
  const form = useForm()

  const { coorDepartamentos, coorMunicipios } = useGetDataMaps({ qryParams })

  const handleClickAccordion = (name) => {
    setExpandedAccordions(
      expandedAccordions.includes(name)
        ? expandedAccordions.filter((item) => item !== name)
        : [...expandedAccordions, name]
    )
  }
  const [center, setCenter] = useState({
    lat: 3.666666,
    lng: -73.2973333,
  })

  const [zoom, setZoom] = useState(6)
  const { mutateActiveAcct, infoActiveAcct, loadingActiveAcct, errorActiveAcct } =
    useActiveAcctApi()
  const { mutateSector, loadingSector, errorSector, infoSector } = useSectorApi()
  const {
    mutateMonitoringByRegion,
    loadingMonitoringByRegion,
    errorMonitoringByRegion,
    infoMonitoringByRegion,
  } = useMonitoringByRegion()
  const { mutateAlertDetail, loadingAlertDetail, errorAlertDetail, infoAlertDetail } =
    useAlertDetail()
  const resultsVars = {
    qryParams,
    activeAct: { mutateActiveAcct, infoActiveAcct, errorActiveAcct, loadingActiveAcct },
    sector: { mutateSector, loadingSector, errorSector, infoSector },
    monitoringByRegion: {
      mutateMonitoringByRegion,
      loadingMonitoringByRegion,
      errorMonitoringByRegion,
      infoMonitoringByRegion,
    },
    AlertDetail: {
      mutateAlertDetail,
      loadingAlertDetail,
      errorAlertDetail,
      infoAlertDetail,
      qryParams,
    },
  }
  const onSubmit = (data) => {
    const params = Object.entries(data)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => {
        if (key === 'municipio' || key === 'departamento' || key === 'region') {
          return `${key}=${value.id}`
        } else if (key === 'coordinador') {
          return `${key}=${value.id_usuario}`
        } else if (key === 'ari') {
          return `sigedocInclusion=${value.sigedoc_inclusion}`
        } else if (key === 'contratante_ejecutor') {
          return `${key}=${value.nombre}`
        } else if (key === 'entidad') {
          return `${key}=${value.nombre}`
        } else {
          return typeof value === 'object' ? `${key}=${value.id}` : `${key}=${value}`
        }
      })
      .join('&')
    setQryParams(params)
    mutateActiveAcct({ qry: `?${params}` })
    mutateSector({ qry: `?${params}` })
    mutateMonitoringByRegion({ qry: `?${params}` })
    mutateAlertDetail({ qry: `?${params}` })
  }

  const AccordionData = useAccordionsGeneralReport({
    center,
    zoom,
    setZoom,
    setCenter,
    form,
    onSubmit,
    loading: loadingActiveAcct || loadingSector || loadingMonitoringByRegion || loadingAlertDetail,
    resultsVars,
    coorDepartamentos,
    coorMunicipios,
  })

  const props = { AccordionData, expandedAccordions, handleClickAccordion }
  return <AccordionDisplay {...props} />
}

export default ContentGeneralReport
