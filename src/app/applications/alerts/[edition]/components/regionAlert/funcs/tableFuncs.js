export const tableFuncs = ({ infoAlert, createRegionAlert, updateRegionInAlert }) => {
  const updateInfo = (data) => {
    const adaptData = {
      alerta_id: infoAlert?.id,
      departamento_id: data?.departamentoInfo?.id,
      municipio_id: data?.municipioInfo?.id,
    }
    if (data?.isNew) {
      createRegionAlert(adaptData)
      return
    }
    updateRegionInAlert({
      id: data?.id,
      body: adaptData,
    })
  }

  const deleteRegion = (id) => {
    updateRegionInAlert({
      id,
      body: { esBorrado: true },
    })
  }
  return { updateInfo, deleteRegion }
}
