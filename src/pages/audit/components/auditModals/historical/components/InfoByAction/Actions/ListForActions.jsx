import { Divider, ListItem, ListItemText } from '@mui/material'

const ListForActions = ({ dataToShow }) => {
  return (
    <>
      <ListItem
        sx={{
          padding: '5px 15px 1px 15px',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'backgroundWhite1',
        }}
      >
        {dataToShow?.map((item, index) => {
          return (
            <ListItemText
              sx={{ width: '100%', textAlign: 'start' }}
              key={index}
            >
              {item}
            </ListItemText>
          )
        })}
      </ListItem>
      <Divider />
    </>
  )
}

export default ListForActions
