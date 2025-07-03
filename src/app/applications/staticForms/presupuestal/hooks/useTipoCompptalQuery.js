/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react'
import { useOracleExecutes } from '@/libV4'
import { masterFormFields } from '../funcs'

const useTipoCompptalQuery = ({
  compptalType,
  nit_compania,
  nrodoc_orden,
  prefijo_orden,
  setValue,
  setNewPptal,
  division,
}) => {
  const [responseQuery, setResponseQuery] = useState(null)
  const { getQueryResult, isPendingQuery } = useOracleExecutes()
  const inputs = masterFormFields()

  const generatePrefijo = async () => {
    const query = `SELECT prefijo
    from documento
    where documento = 15`
    const result = await getQueryResult(query)
    setValue(`comprobantepptal_w.prefijo`, result?.data?.[0]?.prefijo)
  }

  const getConcepto = async () => {
    const query = `SELECT concepto
    from orden_pagou
    where orden = ${nrodoc_orden}`
    const result = await getQueryResult(query)
    setValue(`comprobantepptal_w.concepto`, result?.data?.[0]?.concepto)
  }

  const escapeSqlValue = (val) => (val ? `'${String(val).trim().replace(/'/g, "''")}'` : 'NULL')

  const sqlPrefijoOrden = escapeSqlValue(prefijo_orden)
  const sqlNrodocOrden = escapeSqlValue(nrodoc_orden)

  const setValuesFromData = useCallback(
    (data) => {
      inputs.forEach(({ name }) => {
        const key = name.split('.')[1]
        if (key in data) {
          setValue(name, data[key])
        }
      })
      setValue('comprobantepptal_w.orden', +nrodoc_orden)

      setResponseQuery(data)
    },
    [inputs, setValue]
  )

  const buildComprobanteWhere = () => `
    nit_compania = '${nit_compania}'
    AND tipo_compptal = '${compptalType}'
    AND nrodoc_orden = ${sqlNrodocOrden}
    AND prefijo_orden = ${sqlPrefijoOrden}
  `

  const checkIfComprobanteExists = useCallback(async () => {
    const query = `SELECT 1 FROM comprobantepptal_w WHERE ${buildComprobanteWhere()} AND ROWNUM = 1`
    const result = await getQueryResult(query)
    return result?.success && result.data?.length > 0
  }, [getQueryResult, buildComprobanteWhere])

  const fetchComprobanteData = useCallback(async () => {
    const query = `SELECT * FROM comprobantepptal_w WHERE ${buildComprobanteWhere()}`
    const result = await getQueryResult(query)

    const data = result?.data?.[0]
    if (result?.success && data) setValuesFromData(data)
  }, [getQueryResult, buildComprobanteWhere, setValuesFromData])

  const initializeNewComprobante = async () => {
    setNewPptal(true)
    generatePrefijo()
    getConcepto()

    const today = new Date()

    const fields = {
      'comprobantepptal_w.orden': +nrodoc_orden,
      'comprobantepptal_w.nrodoc_orden': +nrodoc_orden,
      'comprobantepptal_w.prefijo_orden': +prefijo_orden,
      'comprobantepptal_w.division': division,
      'comprobantepptal_w.estado': 'V',
      'comprobantepptal_w.fecha': today,
    }

    Object.entries(fields).forEach(([key, value]) => setValue(key, value))
  }

  useEffect(() => {
    if (!compptalType || !nit_compania) return
    ;(async () => {
      const exists = await checkIfComprobanteExists()
      if (exists) {
        await fetchComprobanteData()
      } else {
        await initializeNewComprobante()
      }
    })()
  }, [compptalType, nit_compania, nrodoc_orden, prefijo_orden])

  return { responseQuery, isPendingQuery }
}

export default useTipoCompptalQuery
