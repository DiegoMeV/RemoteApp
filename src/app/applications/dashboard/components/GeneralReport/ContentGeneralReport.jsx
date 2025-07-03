import { useEffect, useState } from 'react'
import { CustomAccordion, formatDateForTextfield } from '@/lib'
import { accordionGeneralReportData } from '../../funcs'
import { useForm } from 'react-hook-form'
import { useAlertCount, useAlertsByState, useAlertValue, useTotalProjects } from './analitycsApis'

const ContentGeneralReport = () => {
  const { mutateAlertCount, infoAlertCount, loadingAlertCount, errorAlertCount } = useAlertCount()
  const { mutateAlertValue, infoAlertValue, loadingAlertValue, errorAlertValue } = useAlertValue()
  const { mutateAlertsByState, infoAlertsByState, loadingAlertsByState, errorAlertsByState } =
    useAlertsByState()
  const { mutateTotalProjects, infoTotalProjects, loadingTotalProjects, errorTotalProjects } =
    useTotalProjects()
  const [params, setParams] = useState('')
  useEffect(() => {
    mutateAlertCount()
    mutateAlertsByState()
    mutateTotalProjects()
    mutateAlertValue()
  }, [mutateAlertCount, mutateAlertsByState, mutateTotalProjects, mutateAlertValue])

  const form = useForm()
  const onSubmit = (data) => {
    const params = Object.entries(data)
      .map(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'fechaRegistroAlerta') {
            return `${key}=${formatDateForTextfield(value)}`
          }
          if (value && typeof value === 'object' && value.id !== undefined && value.id !== null) {
            return `${key}=${value.id}`
          } else {
            return `${key}=${value}`
          }
        }
        return null // Devuelve null para los valores undefined
      })
      .filter(Boolean) // Filtra los valores null o undefined
      .join('&')
    setParams(params)
    if (data.municipio) {
      setCenter(JSON.parse(data.municipio.coordenadas))
      setZoom(15)
      return
    }
    if (data.departamento) {
      setCenter(JSON.parse(data.departamento.coordenadas))
      setZoom(10)
    }
    mutateAlertCount({ qry: `?${params}` })
    mutateAlertsByState({ qry: `?${params}` })
    mutateTotalProjects({ qry: `?${params}` })
    mutateAlertValue({ qry: `?${params}` })
    //TODO: Implement onSubmit
  }

  const [expandedAccordions, setExpandedAccordions] = useState(['resultados', 'Filtros'])

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
  const apiData = {
    results: {
      infoAlertCount: infoAlertCount?.data,
      infoAlertValue: infoAlertValue?.data,
      infoAlertsByState: infoAlertsByState?.data,
      infoTotalProjects: infoTotalProjects?.data,
      loading:
        loadingAlertCount || loadingAlertsByState || loadingTotalProjects || loadingAlertValue,
      error: errorAlertCount || errorAlertsByState || errorTotalProjects || errorAlertValue,
    },
  }

  const AccordionData = accordionGeneralReportData({
    apiData,
    center,
    zoom,
    form,
    onSubmit,
    params,
  })

  return (
    <>
      {AccordionData.map((accordion) => (
        <CustomAccordion
          key={accordion.name}
          title={accordion.title}
          backgroundColor='backgroundWhite1'
          expandedValue={expandedAccordions.includes(accordion.name)}
          onClickAccordion={() => handleClickAccordion(accordion.name)}
        >
          {accordion.content}
        </CustomAccordion>
      ))}
    </>
  )
}

export default ContentGeneralReport
