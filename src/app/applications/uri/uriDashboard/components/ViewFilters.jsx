import { AutocompleteValueList, ChooseInput, ClassicIconButton } from '@/lib'
import { FormatClear } from '@mui/icons-material'
import { Button, CircularProgress, Grid } from '@mui/material'

const ViewFilters = ({ form, onSubmit, inputList, loadingExecutiveInfo }) => {
  return (
    <Grid
      container
      component={'form'}
      onSubmit={form.handleSubmit(onSubmit)}
      spacing={2}
      justifyContent={'space-between'}
      p={2}
    >
      {inputList.map((input) =>
        input.type === 'autocomplete' ? (
          <AutocompleteValueList
            key={input.name}
            controlModal={input.control?.controlModal}
            required={input.required}
            control={form.control}
            name={input.name}
            md={input.md}
            label={input.label}
            options={input.control?.dataList}
            loading={input.control?.isLoading}
            searchText={input.control?.controlSearch}
            columns={input.columnsModal ?? []}
            setValue={form.setValue}
            getLabel={input.labelOption}
          />
        ) : (
          <ChooseInput
            key={input.name}
            item={input}
            control={form.control}
            setValue={form.setValue}
          />
        )
      )}
      <Grid
        item
        xs={4}
        display={'flex'}
      >
        <ClassicIconButton
          onClick={() => form.reset()}
          title='Limpiar'
        >
          <FormatClear />
        </ClassicIconButton>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          fullWidth
        >
          {loadingExecutiveInfo ? (
            <CircularProgress
              size={24}
              color='inherit'
            />
          ) : (
            'Buscar'
          )}
        </Button>
      </Grid>
    </Grid>
  )
}

export default ViewFilters
