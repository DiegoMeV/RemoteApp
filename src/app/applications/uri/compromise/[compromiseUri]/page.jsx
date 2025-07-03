import { useState } from 'react'
import { ViewCompromiseUri } from './views'
import { useGetCompromise } from '@/lib'
import { useParams } from 'react-router-dom'

const CompromiseUri = () => {
  const params = useParams()
  const [activeStep, setActiveStep] = useState(0)
  const idCompromise = params.compromiseUri
  const { data: dataTables } = useGetCompromise({
    qry: `/${idCompromise}`,
    disabled: !idCompromise,
  })
  const [dataEditCompromisee] = dataTables?.data ?? []
  return (
    <ViewCompromiseUri
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      idCompromise={idCompromise}
      dataEditCompromisee={dataEditCompromisee}
    />
  )
}

export default CompromiseUri
