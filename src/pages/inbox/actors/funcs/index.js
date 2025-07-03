import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export const actorsColumns = (deletePrivilege, handleDeleteActor) => {
  const deletecolumn = {
    headerName: '',
    field: 'options',
    pinned: 'right',
    width: 50,
    renderCell: (data) => {
      return (
        <IconButton
          headerName='Borrar actor'
          onClick={() => handleDeleteActor(data.id)}
        >
          <Delete />
        </IconButton>
      )
    },
  }

  const columns = [
    {
      headerName: 'Nombre',
      field: 'name',
      renderCell: (data) => {
        const actorData = data?.userActorData
        const name = `${actorData?.firstName ?? ''} ${actorData?.lastName ?? ''}`
        return name
      },
    },
    {
      headerName: 'Tipo de actor',
      field: 'ActorType',
      renderCell: (data) => data?.ActorType?.name,
    },
  ]

  return deletePrivilege ? [...columns, deletecolumn] : columns
}
