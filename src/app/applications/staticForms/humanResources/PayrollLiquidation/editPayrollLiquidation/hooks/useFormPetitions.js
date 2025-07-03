import { useEffect, useState } from 'react'
import { infoPeriod, infoVinculation } from '../constants'

const useFormPetitions = ({ nit_compania, getQueryResult }) => {
  const queryPeriod = infoPeriod({ nit_compania })
  const queryVinculation = infoVinculation({ nit_compania })

  const [periodInfo, setPeriodInfo] = useState([])
  const [vinculationInfo, setVinculationInfo] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQueryResult(queryPeriod)
        setPeriodInfo(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (infoPeriod) fetchData()
  }, [getQueryResult, queryPeriod])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQueryResult(queryVinculation)
        setVinculationInfo(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (infoVinculation) fetchData()
  }, [getQueryResult, queryVinculation])

  return {
    periodInfo,
    vinculationInfo,
  }
}

export default useFormPetitions
