import { useForm } from 'react-hook-form'
import { useGlobalVaribles } from '@/lib'
import './styles/styles.css'
import { ViewEditPayrollLiquidation } from './views'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { infoIndividualPayroll } from './constants'
import { useOracleExecutes } from '@/libV4'

const EditPayrollLiquidation = () => {
  const form = useForm({
    defaultValues: {},
  })

  const componentForm = useForm({ defaultValues: {} })

  const location = useLocation()
  const getGlobalVariables = useGlobalVaribles()
  const { nit_compania, division } = getGlobalVariables()
  const { getQueryResult, isPendingQuery } = useOracleExecutes()
  const queryParams = new URLSearchParams(location?.search)
  const [infoNomina, setInfoNomina] = useState({})

  const paramsPeriodo = queryParams.get('periodo')
  const paramsVinculacion = queryParams.get('vinculacion')
  const paramsNomina = queryParams.get('nomina')
  const isNew = queryParams.get('isNew')

  const [titleForm, setTitleForm] = useState('')
  const identifier = `${paramsPeriodo}_${paramsNomina}`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryNomina = infoIndividualPayroll({
          nit_compania,
          paramsPeriodo,
          paramsVinculacion,
          paramsNomina,
        })
        const response = await getQueryResult(queryNomina)
        const infoNomina = response?.data?.[0]
        const structuredData = {
          ...infoNomina,
          periodo: JSON.parse(infoNomina?.periodo_info),
          vinculacion: JSON.parse(infoNomina?.vinculacion_info),
          fechaInicio: infoNomina?.fecha_ini_fmt,
          fechaFin: infoNomina?.fecha_fin_fmt,
        }
        setInfoNomina(structuredData)
        setTitleForm(infoNomina?.descripcion ?? '')
        form.reset(structuredData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (infoIndividualPayroll && !isNew) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const props = {
    infoNomina,
    form,
    componentForm,
    identifier,
    titleForm,
    nit_compania,
    division,
    getQueryResult,
    isPendingQuery,
    isNew,
    periodo: paramsPeriodo,
    nomina: paramsNomina,
  }

  return <ViewEditPayrollLiquidation {...props} />
}

export default EditPayrollLiquidation
