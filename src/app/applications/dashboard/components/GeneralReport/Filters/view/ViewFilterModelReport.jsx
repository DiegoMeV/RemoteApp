import { AutocompleteValueList, ChooseInput, ClassicIconButton } from '@/lib'
import { Button, Grid } from '@mui/material'
import { inputsList } from '../funcs'
import { FormatClear } from '@mui/icons-material'
// import { inputList } from '../constant'

const ViewFilterModelReport = ({
  control,
  handleSubmit,
  onSubmit,
  setValue,
  columnsModal,
  model,
  contractor,
  subContractor,
  origin,
  alerts,
  addressee,
  category,
  regions,
  province,
  citie,
  criterionRisk,
  controlSubject,
  reset,
}) => {
  const inputList = inputsList({
    model,
    contractor,
    subContractor,
    origin,
    alerts,
    addressee,
    category,
    regions,
    province,
    citie,
    criterionRisk,
    controlSubject,
  })

  return (
    <Grid
      container
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      justifyContent={'space-between'}
      p={2}
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
            loading={input.control?.isLoading}
            searchText={input.control?.controlSearch}
            columns={columnsModal}
            setValue={setValue}
            getLabel={input.labelOption}
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
      <Grid
        item
        xs={4}
        display={'flex'}
      >
        <ClassicIconButton
          onClick={() => reset?.()}
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
          Buscar
        </Button>
      </Grid>
    </Grid>
  )
}

export default ViewFilterModelReport
