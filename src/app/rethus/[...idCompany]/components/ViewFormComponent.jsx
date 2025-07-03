import { AutocompleteValueList, ChooseInput } from '@/lib'
import { Box, Grid } from '@mui/material'

const ViewFormComponent = ({ control, setValue, inputList, columnsModal }) => {
  return (
    <Box
      p={3}
      bgcolor={'backgroundWhite1'}
      borderRadius={'10px'}
    >
      <Grid
        container
        spacing={5}
      >
        {inputList.map((input) =>
          input.type === 'autocomplete' ? (
            <AutocompleteValueList
              key={input.name}
              controlModal={input.control?.controlModal}
              control={control}
              name={input.name}
              md={input.md}
              label={input.label}
              options={input.control?.dataList}
              loading={input.control?.isLoading || input.loading}
              searchText={input.control?.controlSearch}
              columns={input.columnsModal ?? columnsModal ?? []}
              setValue={setValue}
              getLabel={input.labelOption}
              getValues={input.getValues}
              required={input.required}
              errorMsj={input.errorMsj}
              onChange={input.onChange}
              disabled={input.disabled}
            />
          ) : (
            <ChooseInput
              key={input.name}
              item={input}
              control={control}
              setValue={setValue}
            />
          )
        )}
      </Grid>
    </Box>
  )
}

export default ViewFormComponent
