import toast from 'react-hot-toast'
import { GridRowModes } from '@mui/x-data-grid-premium'

export const updateInfoFunctionaries = ({
  setRowModesModel,
  rowModesModel,
  apiRef,
  createInspectionOfficials,
}) => {
  const updateInfo = async (data) => {
    // control when the name is undefined
    if (data['third'] === undefined) {
      toast.error('Debe seleccionar mínimo un elemento.')
      setRowModesModel({ ...rowModesModel, [data.id]: { mode: GridRowModes.Edit } })
      apiRef.current.startRowEditMode({ id: data.id })
      return
    }
    // control when the order is undefined
    if (data['order'] === undefined) {
      toast.error('Debe seleccionar el orden del usuario.')
      setRowModesModel({ ...rowModesModel, [data.id]: { mode: GridRowModes.Edit } })
      apiRef.current.startRowEditMode({ id: data.id })
      return
    }
    // control when the percentage is undefined or less than 0
    if (data['percentage'] === undefined || data['percentage'] <= 0) {
      toast.error('El porcentage no puede ser 0 o menor.')
      setRowModesModel({ ...rowModesModel, [data.id]: { mode: GridRowModes.Edit } })
      apiRef.current.startRowEditMode({ id: data.id })
      return
    }
    // Create new row
    if (data?.isNew) {
      createInspectionOfficials({
        body: {
          idUser: data.third.id,
          order: data.order,
          percentage: data.percentage,
        },
      })
      return
    }
  }
  return updateInfo
}
