import { useState } from 'react'
import { infoDetailPayroll, infoIndividualVolante, infoPayrollProcesses } from '../constants'
import { isEmpty } from '@/libV4'

const useFormHandlers = ({
  nit_compania,
  getQueryResult,
  componentForm,
  periodo,
  nomina,
  modelDetail,
}) => {
  const [infoDetail, setInfoDetail] = useState([])
  const [infoVolante, setInfoVolante] = useState([])
  const [dataPayrollProcesses, setDataPayrollProcesses] = useState([])

  const handleGetDetail = async (busqueda = '') => {
    const queryDetail = infoDetailPayroll({
      nit_compania,
      periodo,
      nomina,
      modelDetail,
      busqueda,
    })
    try {
      if (periodo && nomina) {
        const response = await getQueryResult(queryDetail)
        setInfoDetail(response?.data ?? [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleGetVolante = async (params) => {
    const queryVolante = infoIndividualVolante({
      nit_compania: params?.nit_compania,
      periodo: params?.periodo,
      nomina: params?.nomina,
      tercero: params?.tercero,
      tercero_type: params?.tercero_type,
      id_unico: params?.id_unico,
    })
    try {
      const response = await getQueryResult(queryVolante)
      const infoVolante = response?.data?.[0]
      setInfoVolante(infoVolante ?? {})
      if (!isEmpty(infoVolante)) {
        const formValues = {
          empleado: {
            periodo: JSON.parse(infoVolante?.periodo_info),
            fecha_inicio: infoVolante?.fecha_inicio,
            fecha_fin: infoVolante?.fecha_fin,
            nomina: JSON.parse(infoVolante?.nomina_info),
            tercero: JSON.parse(infoVolante?.empleado_info),
            sueldo: infoVolante?.valor,
            total_a_pagar: infoVolante?.total_a_pagar,
            total_ingresos: infoVolante?.total_ingresos,
            total_deducciones: infoVolante?.total_deducciones,
            nit_compania: infoVolante?.nit_compania,
            tercero_type: infoVolante?.tercero_type,
            id_unico: infoVolante?.id_unico,
          },
        }
        componentForm.reset(formValues)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleGetPayrollProcesses = async (busqueda = '') => {
    try {
      const queryPayrollProcesses = infoPayrollProcesses({
        nit_compania,
        periodo,
        nomina,
        busqueda,
      })
      const response = await getQueryResult(queryPayrollProcesses)
      setDataPayrollProcesses(response ?? [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return {
    handleGetDetail,
    handleGetVolante,
    handleGetPayrollProcesses,
    infoDetail,
    infoVolante,
    dataPayrollProcesses,
  }
}

export default useFormHandlers
