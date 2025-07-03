import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useReqCharts } from '@/libV4'

const useManagementFiles = () => {
  const form = useForm({})

  const [infoCharts, setInfoCharts] = useState(null)

  const [queryParams, setQueryParams] = useState('')

  const onSubmit = (data) => {
    const { idProcessType, ...restData } = data

    const filterInfo = { idProcessType: idProcessType?.id, ...restData }

    let filteredData = Object.fromEntries(
      Object.entries(filterInfo).filter(([, v]) => v !== undefined && v !== '' && v !== null)
    )

    const queryParams = new URLSearchParams(filteredData).toString()
    setQueryParams(queryParams)
  }

  const requests = [
    { reqType: 'processes-by-status' },
    { reqType: 'process-by-last-activity' },
    { reqType: 'process-debt-by-type', reqRes: true },
    { reqType: 'processes-by-year', reqRes: true },
  ]

  const { loadingStates } = useReqCharts({
    queryParams,
    setInfoCharts,
    baseKey: 'urlFiscalizacion',
    requests,
  })

  const stateVars = { form, infoCharts, loading: loadingStates, queryParams }

  const stateFuncsVars = { onSubmit }

  return [stateVars, stateFuncsVars]
}
export default useManagementFiles
