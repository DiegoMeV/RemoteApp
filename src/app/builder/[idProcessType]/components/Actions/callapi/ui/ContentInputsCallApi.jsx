import { Box, Grid } from '@mui/material'
import { CustomTextField, SelectInput } from '@/lib'
import {
  labelItemCallApi,
  labelItemTitleCallApi,
  methodItemCallApi,
  positionItemInput,
} from '../../constants'

// TO-DO: This component should be refactored to use libV4's GenericForm, to be more readable.

const ContentInputsCallApi = ({ action, loadingElement, control }) => {
  const isRequiredPosition = action?.actionType !== 'PAY_ORDER_APPROVAL'
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Grid
        container
        spacing={1}
      >
        {isRequiredPosition && (
          <Grid
            item
            xs={12}
            sm={2}
          >
            <CustomTextField
              item={{ ...positionItemInput, disabled: loadingElement }}
              control={control}
            />
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sm={isRequiredPosition ? 10 : 12}
        >
          <CustomTextField
            item={{ ...labelItemTitleCallApi, disabled: loadingElement }}
            control={control}
          />
        </Grid>
      </Grid>
      <CustomTextField
        item={{ ...labelItemCallApi, disabled: loadingElement }}
        control={control}
      />
      <SelectInput
        item={{ ...methodItemCallApi, disabled: loadingElement }}
        control={control}
      />
    </Box>
  )
}

export default ContentInputsCallApi
