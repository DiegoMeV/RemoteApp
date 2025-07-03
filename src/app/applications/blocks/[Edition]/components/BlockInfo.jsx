import { ChooseInput, CustomAccordion } from '@/lib'
import { Grid } from '@mui/material'
import { inputsBlocks } from '../constants'

const BlockInfo = ({ control }) => {
  return (
    <CustomAccordion
      title='Bloque'
      defaultExpanded={true}
    >
      <Grid
        container
        spacing={2}
      >
        {inputsBlocks.map((input, index) => (
          <ChooseInput
            key={index}
            control={control}
            item={input}
          />
        ))}
      </Grid>
    </CustomAccordion>
  )
}

export default BlockInfo
