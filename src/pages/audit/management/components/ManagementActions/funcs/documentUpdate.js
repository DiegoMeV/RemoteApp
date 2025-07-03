export const documentUpdate = (elementAction, dataDocument) => {
  return {
    idTaskActionItem: elementAction?.id,
    idDocument: dataDocument.idDocumento,
    idDocumentVersion: dataDocument?.idVersionDoc,
    documentStatus: dataDocument?.estado,
    idComment: dataDocument?.idComentario,
  }
}

export const newDocumentUpdate = (elementAction, comment, state, idActivityActionItem) => {
  return {
    idTaskActionItem: elementAction?.id,
    comentario: comment,
    estado: state,
    idActivityActionItem,
  }
}
