import { useEffect, useState } from 'react'
import { useAccordionsManagementReport, useExecutiveInfo } from './funcs'
import AccordionDisplay from '../AccordionDisplay'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BackdropLoading, CustomModal, useBoolean, useGetBufferReport } from '@/lib'
import { ButtonDownloadReport, GraphsDisplay } from './components'

const ContentManagementReport = () => {
  const [expandedAccordions, setExpandedAccordions] = useState(['filtros'])
  const modalManagementReport = useBoolean()
  const [infoRow, setInfoRow] = useState({})
  const { mutateAsync: getBufferReport, isPending: loadingBuffer } = useGetBufferReport({
    onSuccess: () => {
      toast.success('Descarga exitosa')
    },
    onError: (error) => {
      toast.error('Error ', error)
    },
  })
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

  const coordinates = infoRow?.coordenadas_municipio || ''
  const onSubmit = (data) => {
    setExpandedAccordions(['filtros', 'tabla'])
    let qry = `?`
    if (data?.ari) {
      qry += `sigedocInclusion=${data?.ari.sigedoc_inclusion}`
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
        } else if (key === 'contratante_ejecutor') {
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
  const AccordionData = useAccordionsManagementReport({
    center,
    zoom,
    setZoom,
    setCenter,
    form,
    onSubmit,
    infoExecutiveInfo,
    loadingExecutiveInfo,
    errorExecutiveInfo,
    mutateExecutiveInfo,
    modalManagementReport,
    setInfoRow,
  })

  const props = {
    AccordionData,
    expandedAccordions,
    handleClickAccordion,
  }
  return (
    <>
      <BackdropLoading loading={loadingBuffer} />
      <AccordionDisplay {...props} />
      <CustomModal
        open={modalManagementReport?.show}
        handleClose={modalManagementReport?.handleShow}
        title={'Informe de gestión'}
        height='80vh'
        size='xl'
      >
        <ButtonDownloadReport
          getBufferReport={getBufferReport}
          infoRow={infoRow}
          coordinates={coordinates}
        />
        <GraphsDisplay infoRow={infoRow} />
      </CustomModal>
    </>
  )
}

export default ContentManagementReport
