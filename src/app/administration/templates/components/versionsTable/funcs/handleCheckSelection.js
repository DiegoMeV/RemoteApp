export const handleCheckSelection = ({ setSelectionModel, setConfirmAlertProps, editTemplate }) => {
  const handleSelectionModelChange = (newSelectionModel) => {
    setConfirmAlertProps({
      open: true,
      icon: 'info',
      title: '¿Desea cambiar la versión?',
      content: null,
      onConfirm: () => {
        setSelectionModel(newSelectionModel)
        editTemplate({
          body: {
            idVersion: newSelectionModel[0],
          },
        })
      },
    })
  }
  return { handleSelectionModelChange }
}
