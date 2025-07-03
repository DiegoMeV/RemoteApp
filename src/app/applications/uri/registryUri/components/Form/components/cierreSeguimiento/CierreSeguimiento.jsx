import { Box, Grid } from '@mui/material'

import { BasicTitle, ChooseInput, useQueryDynamicApi } from '@/lib'
import { columnsData } from './columnsData'

const CierreSeguimiento = ({ form }) => {
  const { data: workZone } = useQueryDynamicApi({
    url: '/equiposUri?activo=S',
    baseKey: 'urlCgr',
    isCompanyRequest: true,
  })

  const inputs = columnsData({ workZone, form })

  return (
    <Box>
      <Grid
        item
        xs={12}
      >
        <BasicTitle title='Cierre seguimiento' />
      </Grid>
      <Grid
        container
        my='36px'
        spacing={4}
      >
        {inputs.map((field) => (
          <ChooseInput
            key={field.name}
            item={field}
            control={form.control}
            setValue={form.setValue}
          />
        ))}
      </Grid>
    </Box>
  )
}

export default CierreSeguimiento
