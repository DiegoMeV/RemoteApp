import { ClassicIconButton } from '@/lib'
import { Delete } from '@mui/icons-material'
import { Grid } from '@mui/material'
import FilterItem from './FilterItem'

const FilterElement = ({ filter, control, removeFilter, setValue }) => {
  return (
    <>
      <FilterItem
        filter={filter}
        control={control}
        setValue={setValue}
      />
      <Grid
        item
        xs={12}
        md={1}
        display='flex'
        justifyContent='flex-end'
      >
        <ClassicIconButton
          color='secondary'
          onClick={() => {
            removeFilter(filter?.id)
          }}
        >
          <Delete />
        </ClassicIconButton>
      </Grid>
    </>
  )
}

export default FilterElement
