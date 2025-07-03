import { removeNullFields, useOracleExecutes } from '@/libV4'
import { processValues } from '../funcs'

const useFormSubmitters = ({
  trigger,
  getValues,
  setValue,
  blockMaster,
  inputs,
  pushDataForm,
  nit_compania,
  newPptal,
  setNewPptal,
  compptalType,
}) => {
  const { getQueryResult } = useOracleExecutes()
  const tipo_id = getValues(`${blockMaster}.tipo_id`)
  const prefijo = getValues(`${blockMaster}.prefijo_orden`)
  const tipo_compptal = getValues(`${blockMaster}.tipo_compptal`)

  const generateNroDoc = async () => {
    const query = `SELECT NVL(MAX(nrodoc),0) + 1 AS nuevo_nrodoc
      FROM comprobantepptal_w
      WHERE nit_compania = '${nit_compania}'
        AND tipo_compptal = '${tipo_compptal}'
        AND prefijo = ${prefijo}
        AND tipo_id = ${tipo_id}`

    const result = await getQueryResult(query)
    const nrodoc = result?.data?.[0]?.nuevo_nrodoc
    setValue(`${blockMaster}.nrodoc`, nrodoc)
    return nrodoc
  }

  const onSubmitedEditPptal = async () => {
    const isFormValid = await trigger([blockMaster])
    if (!isFormValid) return

    const formData = getValues(blockMaster)
    const dataProcess = processValues(formData, inputs)
    const cleanedFormData = removeNullFields(dataProcess)

    const editPayload = {
      [blockMaster]: {
        where: {
          nro_comprobantepptal: formData.nro_comprobantepptal,
          nit_compania,
        },
        data: cleanedFormData,
      },
    }

    try {
      await pushDataForm({ body: editPayload, bodyMethod: 'PUT' })
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const onSubmitedNewPptal = async () => {
    const nrodoc = await generateNroDoc()

    const formData = { ...getValues(blockMaster), nrodoc }
    const dataProcess = processValues(formData, inputs)
    const cleanedFormData = removeNullFields(dataProcess)

    const body = {
      blockId: blockMaster,
      data: {
        ...cleanedFormData,
        nrodoc,
        tipo_compptal: compptalType,
        nit_compania,
      },
    }

    try {
      await pushDataForm({ body, methodBody: 'POST' })
      setNewPptal(false)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const onSubmitedMasterSection = async () => {
    if (newPptal) {
      await onSubmitedNewPptal()
    } else {
      await onSubmitedEditPptal()
    }
  }

  return { onSubmitedMasterSection }
}

export default useFormSubmitters
