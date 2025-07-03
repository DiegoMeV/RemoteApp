import { useEffect, useState } from 'react'
import { infoOperator, infoPeriodGroup, infoPUAutoliq, infoSucursal } from '../constants'

const useFormPetitions = ({ nit_compania, getQueryResult }) => {
  const queryPeriodGroup = infoPeriodGroup({ nit_compania })
  const querySucursal = infoSucursal({ nit_compania })
  const queryOperator = infoOperator({ nit_compania })
  const queryPlanillas = infoPUAutoliq({ nit_compania })

  const [periodGroup, setPeriodGroup] = useState(null)
  const [sucursalInfo, setSucursalInfo] = useState(null)
  const [operatorInfo, setOperatorInfo] = useState(null)
  const [planillas, setPlanillas] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQueryResult(queryPeriodGroup)
        setPeriodGroup(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (infoPeriodGroup) fetchData()
  }, [getQueryResult, queryPeriodGroup])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQueryResult(querySucursal)
        setSucursalInfo(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (infoPeriodGroup) fetchData()
  }, [getQueryResult, querySucursal])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQueryResult(queryOperator)
        setOperatorInfo(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (infoPeriodGroup) fetchData()
  }, [getQueryResult, queryOperator])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQueryResult(queryPlanillas)
        setPlanillas(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (infoPUAutoliq) fetchData()
  }, [getQueryResult, queryPlanillas])

  return {
    periodGroup,
    sucursalInfo,
    operatorInfo,
    planillas,
  }
}

export default useFormPetitions
