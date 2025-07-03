import { ChooseInput, CustomAccordion } from '@/lib'
import { Box, Chip, Divider, Grid } from '@mui/material'

const ViewVariablesContract = ({ transformVars, openAccordion, handleOpenAccordion, control }) => {
  return (
    <CustomAccordion
      title='Variables contrato'
      expandedValue={openAccordion}
      onClickAccordion={handleOpenAccordion}
    >
      <Box
        bgcolor={'backgroundWhite1'}
        borderRadius={3}
        p={2}
      >
        <Grid
          container
          spacing={2}
        >
          {transformVars?.map((objeto, index) => (
            <Grid
              item
              xs={12}
              key={index}
            >
              <Grid
                container
                spacing={2}
                alignItems='center'
                justifyContent='center'
                mb={2}
              >
                <Grid
                  item
                  xs={4}
                >
                  <div>{objeto.title}</div>
                </Grid>
                <Grid
                  item
                  xs={2}
                >
                  <Chip
                    label={objeto.required ? 'Requerido' : 'Opcional'}
                    color={objeto.required ? 'primary' : 'default'}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <ChooseInput
                    item={objeto}
                    control={control}
                  />
                </Grid>
              </Grid>
              <Divider />
            </Grid>
          ))}
        </Grid>
      </Box>
    </CustomAccordion>
  )
}

export default ViewVariablesContract
