import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Grid } from '@mui/material'
import { FilterElement, OptionsFilters } from '.'

const FormFilters = ({ setFilterOptions, setPaginationModel }) => {
  const { handleSubmit, control, unregister, setValue } = useForm()

  const [filters, setFilters] = useState([{ id: crypto.randomUUID() }])

  const addFilter = () => {
    setFilters([...filters, { id: crypto.randomUUID() }])
  }
  const removeFilter = (id) => {
    setFilters(filters.filter((filter) => filter.id !== id))
    unregister(id)
  }
  const onSubmit = (data) => {
    setPaginationModel({
      page: 0,
      pageSize: 50,
    })

    const adaptData = Object.values(data).reduce((acc, { name, filter }) => {
      acc[filter.trim()] = name
      return acc
    }, {})

    setFilterOptions(adaptData)
  }

  return (
    <Grid
      component='form'
      container
      spacing={2}
      py={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      {filters.map((filter) => {
        return (
          <FilterElement
            key={filter.id}
            filter={filter}
            control={control}
            removeFilter={removeFilter}
            setValue={setValue}
          />
        )
      })}
      <OptionsFilters addFilter={addFilter} />
    </Grid>
  )
}

export default FormFilters
