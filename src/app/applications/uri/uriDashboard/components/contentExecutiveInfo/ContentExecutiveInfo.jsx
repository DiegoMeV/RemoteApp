import { useEffect, useState } from 'react'
import { useAccordionsExecutiveInfo, useExecutiveInfo } from './funcs'
import AccordionDisplay from '../AccordionDisplay'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { CustomModal, useBoolean } from '@/lib'
import { GraphsDisplay } from './components'

const ContentExecutiveInfo = () => {
  const [expandedAccordions, setExpandedAccordions] = useState(['filtros'])
  const modalExecutiveInfo = useBoolean()
  const [registryAriSigeDoc, setRegistryAriSigeDoc] = useState('')
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
  const form = useForm()
  const { mutateExecutiveInfo, infoExecutiveInfo, loadingExecutiveInfo, errorExecutiveInfo } =
    useExecutiveInfo()

  const onSubmit = (data) => {
    setExpandedAccordions(['filtros', 'tabla'])
    let qry = `?`
    if (data?.ari) {
      qry += `sigedocInclusion=${data?.ari?.sigedoc_inclusion}`
    }
    const additionalParams = Object.entries(data)
      .filter(
        ([key, value]) => value !== undefined && value !== null && value !== '' && key !== 'ari'
      )
      .map(([key, value]) => {
        if (
          (key === 'municipio' || key === 'departamento' || key === 'region') &&
          typeof value === 'object'
        ) {
          return `${key}=${value.id}`
        } else if (key === 'contratanteEjecutor') {
          return `${key}=${value.nombre}`
        } else {
          return typeof value === 'object' ? `${key}=${value.id}` : `${key}=${value}`
        }
      })
      .join('&')
    if (additionalParams) {
      qry += `&${additionalParams}`
    }
    mutateExecutiveInfo({ qry })
  }
  useEffect(() => {
    if (infoExecutiveInfo?.data?.length === 0) {
      toast.error('No se encontraron resultados')
    }
  }, [infoExecutiveInfo])
  const AccordionData = useAccordionsExecutiveInfo({
    center,
    zoom,
    setZoom,
    setCenter,
    form,
    onSubmit,
    infoExecutiveInfo,
    loadingExecutiveInfo,
    errorExecutiveInfo,
    modalExecutiveInfo,
    setRegistryAriSigeDoc,
  })

  const props = {
    AccordionData,
    expandedAccordions,
    handleClickAccordion,
  }
  return (
    <>
      <AccordionDisplay {...props} />
      <CustomModal
        open={modalExecutiveInfo?.show}
        handleClose={modalExecutiveInfo?.handleShow}
        title={'Información ejecutiva del proyecto'}
        height='80vh'
        size='xl'
      >
        <GraphsDisplay registryAriSigeDoc={registryAriSigeDoc} />
      </CustomModal>
    </>
  )
}

export default ContentExecutiveInfo
