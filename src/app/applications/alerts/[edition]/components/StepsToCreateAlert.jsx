import { useForm } from 'react-hook-form'
import { useApisAlerts } from './funcs'
import { useNavigate } from 'react-router-dom'
import ViewStepsUpdateAlert from './ViewStepsUpdateAlert'
import { useEffect, useState } from 'react'
import { useApiRequest } from './blocks/funcs'

const StepsToCreateAlert = ({
  infoAlert,
  handleBack,
  isModal = false,
  handleChangeView = () => {},
  handleSetAlertToProcess = () => {},
  blocksByModel,
  variablesObject,
  idEdition,
  isView,
}) => {
  const navigate = useNavigate()

  const handleUpdateView = (data) => {
    if (!isModal) {
      navigate(`/applications/alerts/${data?.data?.id}`)
      return
    }
    handleChangeView(data?.data?.id)
  }

  const { createAlert, updateAlert, loadingCreateAlert, loadingUpdateAlert } = useApisAlerts({
    infoAlert,
    handleUpdateView,
    handleSetAlertToProcess,
    isModal,
  })

  const { postVar, putVar, loadingVars } = useApiRequest()
  const updateInfoValue = (dataSuccess, variable) => {
    Object.entries(dataSuccess.variables).forEach(([key, dataVar]) => {
      const varToUpdate = variable[key]
      let valor = dataVar?.value
      if (!valor) {
        return // No hacer nada si valor no tiene ningún valor
      }
      if (typeof valor === 'boolean') {
        valor = String(valor)
      }
      // Si la variable existe y sus valores son diferentes
      if (varToUpdate && varToUpdate.value !== dataVar.value) {
        if (dataSuccess.variables[key].value === variable[key].value) return
        putVar({
          id: varToUpdate.idDatoAlerta,
          body: { valor: valor },
        })
      }
      // Si la variable no existe, se crea una nueva
      if (!varToUpdate) {
        postVar({
          valor: valor,
          alerta_id: infoAlert.id,
          variable_id: key,
        })
      }
    })
  }

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue('identificador', infoAlert?.identificador)
    setValue('modelo', infoAlert?.modeloInfo)
    setValue('categoria', infoAlert?.categoriaInfo)
    setValue('fecha', new Date().toISOString().slice(0, 10))
    setValue('estado', infoAlert?.estado)
    setValue('descripcion', infoAlert?.descripcion ?? '')
    setValue('variables', variablesObject)
    setValue('valor_alerta', infoAlert?.valor_alerta)
    setValue('id_fte_informacion', infoAlert?.id_fte_informacion)
    setValue('id_registro_ua', infoAlert?.id_registro_ua)
    setValue('criterio', infoAlert?.criterio_id)
    setValue('tipo_alerta', infoAlert?.tipo_alerta ?? 'ALERTA CONTRACTUAL')
    setValue('riesgo', infoAlert?.riesgo)
    setValue('detalle_riesgo', infoAlert?.detalle_riesgo)
    setValue('posible_emblematico', infoAlert?.posible_emblematico ?? false)
    setValue('id_alerta_inicial', infoAlert?.id_alerta_inicial)
  }, [infoAlert, setValue, variablesObject])

  const onSubmit = (data) => {
    const alertData = {
      identificador: data?.identificador,
      modelo_id: data?.modelo?.id,
      categoria_id: data?.categoria?.id,
      descripcion: data?.descripcion,
      estado: data?.estado,
      valor_alerta: data?.valor_alerta,
      id_fte_informacion: data?.id_fte_informacion?.id,
      id_registro_ua: data?.id_registro_ua?.id,
      criterio_id: data?.criterio?.criterio_id,
      tipo_alerta: data?.tipo_alerta,
      riesgo: data?.riesgo,
      detalle_riesgo: data?.detalle_riesgo,
      posible_emblematico: data?.posible_emblematico,
      id_alerta_inicial: data?.id_alerta_inicial?.id,
    }
    if (infoAlert) {
      return updateAlert(alertData), updateInfoValue(data, variablesObject)
    }
    createAlert(alertData)
  }
  const [errorVarInfo, setErrorVarInfo] = useState()
  useEffect(() => {
    const getVariableInfo = (variableId) => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      for (const block of blocksByModel?.data) {
        for (const variable of block.variables) {
          if (variable.variable_id === variableId) {
            return {
              variable_nombre: variable.variable_nombre,
              bloques_datos_nombre: block.bloques_datos_nombre,
            }
          }
        }
      }
      return null
    }
    if (errors.variables) {
      const variableErrorId = Object.keys(errors.variables)[0]
      const variableErrorInfo = getVariableInfo(variableErrorId)
      setErrorVarInfo(variableErrorInfo)
    }
  }, [blocksByModel?.data, errors])

  return (
    <ViewStepsUpdateAlert
      handleSubmit={handleSubmit}
      loadingCreateAlert={loadingCreateAlert}
      loadingUpdateAlert={loadingUpdateAlert}
      onSubmit={onSubmit}
      control={control}
      setValue={setValue}
      infoAlert={infoAlert}
      blocksByModel={blocksByModel}
      register={register}
      handleBack={handleBack}
      errors={errors}
      errorInfo={errorVarInfo}
      loadingVars={loadingVars}
      idEdition={idEdition}
      watch={watch}
      isView={isView}
    />
  )
}

export default StepsToCreateAlert
