import { useReqCharts } from '@/libV4'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const useProcessCharts = () => {
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

  const { loadingStates } = useReqCharts({ queryParams, setInfoCharts, baseKey: 'urlProcess' })

  const stateVars = { form, infoCharts, loading: loadingStates, queryParams }

  const stateFuncsVars = { onSubmit }

  return [stateVars, stateFuncsVars]
}

export default useProcessCharts
