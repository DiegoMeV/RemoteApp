import { sxAccordionStyles } from '@/app/builder/[idProcessType]/styles'
import { GenericForm } from '@/lib'
import { Button, Grid } from '@mui/material'

const ElementInteraction = ({ inputs, control, openModal, sizeBtn = '6' }) => {
  return (
    <Grid
      sx={sxAccordionStyles.contentInputs}
      container
      spacing={1}
      rowSpacing={2}
    >
      <GenericForm
        inputs={inputs}
        control={control}
      />
      <Grid
        item
        xs={sizeBtn}
        sx={sxAccordionStyles?.containerButtonStyle}
      >
        <Button
          variant='contained'
          onClick={openModal?.handleShow}
        >
          Configurar
        </Button>
      </Grid>
    </Grid>
  )
}

export default ElementInteraction
