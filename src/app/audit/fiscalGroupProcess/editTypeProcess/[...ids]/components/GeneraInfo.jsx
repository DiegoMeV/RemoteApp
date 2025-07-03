import { Grid } from '@mui/material'
import { ChooseInput } from './Inputs'
import { generalVar } from './objects'

const generaInfo = ({ ProcessTypesForm }) => {
  return (
    <Grid
      container
      spacing={3}
      padding={2}
    >
      {generalVar.map((item, index) => {
        return (
          <Grid
            item
            key={index}
            xs={12}
            sm={item.type === 'multiline' ? 12 : 6}
            md={item.md || 12}
          >
            <ChooseInput
              item={item}
              control={ProcessTypesForm.control}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default generaInfo
