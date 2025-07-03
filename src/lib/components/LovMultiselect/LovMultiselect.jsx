import { ClassicIconButton, ValueListMultiSelectLov, usePaginationGlobal } from '@/lib/ui'
import { Search } from '@mui/icons-material'
import { Autocomplete, LinearProgress, TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

const LovMultiselect = ({
  name,
  options,
  loading,
  setPageSize,
  setCursor,
  search,
  onChangeOptions,
  valueListModal,
  form,
  autocompleteProps,
  textFieldProps,
  columnsLov,
}) => {
  const pagination = usePaginationGlobal(options, { setPageSize, setCursor }, loading)

  return (
    <>
      <Controller
        name={name}
        control={form?.control}
        render={({ field }) => {
          const getOptions =
            options?.data?.filter((option) => {
              return field?.value?.some(
                (val) => option?.id?.toLowerCase() === val?.id?.toLowerCase()
              )
            }) ?? []
          return (
            <Autocomplete
              {...field}
              defaultValue={getOptions}
              multiple
              size='small'
              options={options?.data ?? []}
              filterOptions={(options) => options}
              onChange={onChangeOptions}
              {...autocompleteProps}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='Firmantes'
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => search?.handleSearchText(e.target.value)}
                  {...textFieldProps}
                  InputProps={{
                    ...params?.InputProps,
                    startAdornment: (
                      <>
                        <ClassicIconButton
                          title='Lista de valores'
                          onClick={() => {
                            valueListModal?.handleShow()
                            search?.clearSearch()
                          }}
                          sx={{
                            height: '25px',
                            width: '25px',
                          }}
                        >
                          <Search />
                        </ClassicIconButton>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
              noOptionsText={loading ? <LinearProgress /> : 'Escribe para buscar'}
            />
          )
        }}
      />
      {valueListModal?.show && (
        <ValueListMultiSelectLov
          openOptions={valueListModal}
          columns={columnsLov}
          rows={options?.data ?? []}
          loading={loading}
          pagination={pagination}
          size={'lg'}
          setValue={form?.setValue}
          searchOptions={search}
          name={name}
          defaultSelected={form?.watch(name)}
        />
      )}
    </>
  )
}

export default LovMultiselect
