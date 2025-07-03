import { TableCell, TableRow } from '@mui/material'

const BodyToCenter = ({ length = 1, children }) => {
  return (
    <TableRow>
      <TableCell
        colSpan={length}
        align='center'
        sx={{
          height: 'max-content !important',
          backgroundColor: 'backgroundWhite1',
        }}
      >
        {children}
      </TableCell>
    </TableRow>
  )
}

export default BodyToCenter
