import {
  CustomAccordion,
  CustomTextField,
} from '@/lib'
import { Box, Grid } from '@mui/material'
import { fildsDatabasic } from './constant'

const BasicDataInputs = ({ control }) => {

  return (
    <CustomAccordion
      defaultExpanded={true}
      title='Datos basicos'
      color='primary'
    >
      <Box
        bgcolor={'backgroundWhite1'}
        borderRadius={2}
        p={2}
      >
        <Grid
          container
          spacing={2}
        >
          {fildsDatabasic.map((field) => (
            <Grid
              key={field.name}
              item
              xs={field.xs}
              md={field.md}
            >
              <CustomTextField
                key={field.name}
                item={field}
                control={control}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </CustomAccordion>
  )
}

export default BasicDataInputs
