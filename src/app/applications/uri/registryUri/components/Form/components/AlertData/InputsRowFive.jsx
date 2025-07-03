import { rowFiveInputs, valueListSelection, valueListsRowFive } from '../../../../funcs'
import {
  ValueListGlobal,
  actionComponents,
  useBoolean,
  useGetProvince,
  useListCities,
  useSearch,
} from '@/lib'
import { useState } from 'react'
import { createQuery } from '@/app/applications/funcs'
import { Grid } from '@mui/material'
import { Controller } from 'react-hook-form'

const InputsRowFive = ({ form }) => {
  const idProvince = form.watch('departamento')
  const [model, setModel] = useState({ page: 0, pageSize: 130 })
  const searchCitie = useSearch()
  const searchProvinces = useSearch()

  const modalCities = useBoolean()
  const modalProvinces = useBoolean()

  const qryLocations = (searchText, aumentarInfo) => {
    if (searchText) {
      return `?pageSize=10&palabraClave=${searchText}&aumentarInfo=${aumentarInfo ?? false}`
    }
    return `?pageSize=10&aumentarInfo=${aumentarInfo ?? false}`
  }

  const qry = createQuery({ search: searchCitie, model })

  const { data: cities, isLoading: loadingCities } = useListCities({
    qry: `${qry}${idProvince ? `&departamento_id=${idProvince}` : ''}`,
  })

  const { data: provinces, isLoading: loadingProvinces } = useGetProvince({
    qry: qryLocations(searchProvinces?.searchText, false),
  })

  const onChangeProvince = (_, data) => {
    form.setValue('departamento', data?.id)
    form.setValue('municipio', null)
  }

  const onChangeCity = (_, data) => {
    form.setValue('municipio', data?.id)
  }

  const inputsRowFive = rowFiveInputs(
    provinces,
    cities,
    modalCities,
    modalProvinces,
    loadingProvinces,
    loadingCities,
    onChangeProvince,
    onChangeCity,
    searchProvinces,
    searchCitie
  )

  const valueLists = valueListsRowFive(
    provinces,
    loadingProvinces,
    modalProvinces,
    onChangeProvince,
    searchProvinces,
    cities,
    loadingCities,
    modalCities,
    onChangeCity,
    searchCitie,
    model,
    setModel
  )

  const dataForValueList = valueListSelection(modalCities?.show, modalProvinces?.show, valueLists)

  return (
    <>
      {inputsRowFive?.map((item, index) => {
        const Input = actionComponents[item?.type] || actionComponents.default
        return (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={item?.space ?? 6}
          >
            <Controller
              name={item?.name}
              control={form.control}
              rules={{ required: item?.required ? 'Este campo es requerido' : false }}
              defaultValue={item?.defaultValue ?? null}
              render={({ field, fieldState: { error } }) => {
                const { required, ...restItem } = item
                const label = `${item?.label} ${required ? '*' : ''}`
                const helperText = error ? error.message : item.helperText ?? ''
                let newValue = field.value
                if (item?.type === 'autocomplete' && newValue) {
                  const replaceValue = field.value
                    ? item?.autocompleteProps?.options?.find((option) => option.id === field.value)
                    : null

                  newValue = replaceValue ?? newValue
                }
                return (
                  <Input
                    {...field}
                    {...restItem}
                    error={!!error}
                    label={label}
                    helperText={helperText}
                    value={newValue}
                  />
                )
              }}
            />
          </Grid>
        )
      })}
      <ValueListGlobal {...dataForValueList} />
    </>
  )
}

export default InputsRowFive
