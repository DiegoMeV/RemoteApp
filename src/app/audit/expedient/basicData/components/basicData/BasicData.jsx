import { CardContent, Grid } from '@mui/material'
import { cardContent } from './style'
import { GenericForm } from '@/lib'
import { inputsList } from './inputsList'

const BasicData = ({ form }) => {
  return (
    <CardContent sx={cardContent}>
      <Grid
        container
        spacing={2}
      >
        <GenericForm
          control={form.control}
          inputs={inputsList}
        />
      </Grid>
    </CardContent>
  )
}

export default BasicData
