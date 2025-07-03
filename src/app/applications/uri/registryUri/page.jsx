import { useState } from 'react'
import { ViewRegistryAri } from './views'
import { useGetAllParams, useGetRecord } from '@/lib'

const RegistryUri = () => {
  const idRegistry = useGetAllParams()?.idRecord
  const [activeStep, setActiveStep] = useState(0)
  const { data: dataRegristry } = useGetRecord({
    qry: `/${idRegistry}`,
    enabled: idRegistry === 'registryUri' ? false : true,
  })
  const [dataEditRegistry] = dataRegristry?.data ?? []

  return (
    <ViewRegistryAri
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      dataEditRegistry={dataEditRegistry}
      idRegistry={idRegistry}
    />
  )
}

export default RegistryUri
