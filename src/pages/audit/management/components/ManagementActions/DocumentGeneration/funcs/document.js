export const setInitialVariableValues = (initialVariables, setValue, templateInfo, userData) => {
  const transcriptorData = initialVariables?.data?.[0]?.transcriptorData ?? userData

  if (initialVariables) {
    const attributes = Object?.entries?.(initialVariables?.data?.[0]?.especificaciones?.data ?? {})
    attributes.forEach(([key, value]) => {
      setValue(key, value)
    })
    setValue('idTablaRetencion', initialVariables?.data?.[0]?.TablaRetencion)
    setValue('redactor', initialVariables?.data?.[0]?.redactorData)
    setValue('transcriptor', transcriptorData)
    return
  }
  setValue('transcriptor', transcriptorData)

  const generationVar = templateInfo?.data?.[0]?.infoVersion?.especificaciones?.variables || []

  generationVar.forEach((variable) => {
    setValue(variable?.nombre, variable?.valorInicial)
  })
}
