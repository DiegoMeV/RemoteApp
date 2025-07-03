import { useEffect, useState } from 'react'
import { ViewMesasUri } from './views'
import { useGetTables } from '@/lib'
import { useParams } from 'react-router-dom'

const MesasUri = () => {
  const params = useParams()
  const [activeStep, setActiveStep] = useState(0)

  const idTable = params.mesasUri
  const { data: dataTables } = useGetTables({
    qry: `/${idTable}`,
    enabled: idTable === 'mesasUri' ? false : true,
  })
  const [dataEditTable] = dataTables?.data ?? []
  useEffect(() => {
    if (dataEditTable?.estado === 'APROBADO TOTAL') {
      setActiveStep(3)
    }
  }, [dataEditTable])

  return (
    <ViewMesasUri
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      idTable={idTable}
      dataEditTable={dataEditTable}
    />
  )
}

export default MesasUri
