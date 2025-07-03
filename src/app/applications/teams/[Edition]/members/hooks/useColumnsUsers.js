import { Typography } from '@mui/material'

const useColumnsTeamMembers = () => {
  const columns = [
    {
      field: 'user',
      headerName: 'Usuario',
      width: 250,
      editable: true,
      renderCell: (params) => {
        let fullName = ''
        if (params?.row?.firstName) {
          fullName = params.row.firstName
          if (params?.row?.lastName) {
            fullName += ' ' + params.row.lastName
          }
        }
        return <Typography variant='body2'>{fullName}</Typography>
      },
    },
  ]
  return columns
}

export default useColumnsTeamMembers
