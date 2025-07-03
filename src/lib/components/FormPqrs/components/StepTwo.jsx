import { ChooseInput } from '@/lib/ui'
import { Grid } from '@mui/material'
import { stepTwoInputs } from '../funcs'

const StepTwo = ({ form }) => {
  const idProcessType = form?.watch('idProcessType')
  const idProcess = form?.watch('idProcess')

  const inputStepTwo = stepTwoInputs({ idProcessType, idProcess })

  return (
    <Grid
      item
      container
      xs={12}
      spacing={2}
      maxHeight='calc(100vh - 350px)'
    >
      {inputStepTwo.map((item, index) => {
        return (
          <ChooseInput
            key={index}
            item={item}
            control={form?.control}
            setValue={form?.setValue}
          />
        )
      })}
    </Grid>
  )
}

export default StepTwo
