import { useForm } from 'react-hook-form'
import { ViewEditPUAutoliq } from './views'
import { useGlobalVaribles } from '@/lib'
import './styles/styles.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useOracleExecutes } from '@/libV4'
import { infoIndividualPlanilla } from './constants'
import { useEffect, useState } from 'react'

const EditPUAutoliq = () => {
  const form = useForm({
    defaultValues: {},
  })
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location?.search)
  const paramsSecuence = queryParams.get('secuence')
  const isNew = queryParams.get('isNew')
  const getGlobalVariables = useGlobalVaribles()
  const { nit_compania } = getGlobalVariables()
  const { getQueryResult, isPendingQuery } = useOracleExecutes()
  const [titleForm, setTitleForm] = useState('')
  const [infoPlanilla, setInfoPlanilla] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryNomina = infoIndividualPlanilla({ nit_compania, paramsSecuence })
        const response = await getQueryResult(queryNomina)
        const infoTablePlanilla = response?.data?.[0]
        const defaultValues = {
          ...infoTablePlanilla,
          nomoperador: JSON.parse(infoTablePlanilla?.nomoperador),
          nomgrupo: JSON.parse(infoTablePlanilla?.nomgrupo),
          nomsucursal_mostrar: JSON.parse(infoTablePlanilla?.nomsucursal_mostrar),
        }
        setInfoPlanilla(defaultValues)
        form.reset(defaultValues)
        setTitleForm(infoTablePlanilla?.nomplanilla ?? '')
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (infoIndividualPlanilla && !isNew) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const props = {
    infoPlanilla,
    form,
    secuence: paramsSecuence,
    titleForm,
    nit_compania,
    getQueryResult,
    isPendingQuery,
    isNew,
    navigate,
  }

  return <ViewEditPUAutoliq {...props} />
}

export default EditPUAutoliq
