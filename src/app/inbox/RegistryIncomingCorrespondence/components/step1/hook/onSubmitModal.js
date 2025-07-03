export const onSubmitModal = async ({ formModal, createActor, idProcess, editActor }) => {
  const validation = await formModal?.trigger()
  if (!validation) return
  const data = formModal.getValues()
  if (!data?.isEdit) {
    const newRow = { ...data }
    delete newRow.id
    const bodyActor = {
      actorTypeKey: 'REMITENTE',
      actorData: {
        additionalData: newRow,
      },
    }
    createActor({ qry: `/${idProcess}/actors`, body: bodyActor })
    return
  }
  const newRow = { ...data }
  delete newRow.isEdit
  delete newRow.id
  editActor({
    qry: `/${data?.id}`,
    methodBody: 'put',
    body: { actorData: { additionalData: newRow } },
  })
}
