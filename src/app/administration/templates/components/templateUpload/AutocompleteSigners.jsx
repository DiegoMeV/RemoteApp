import {
  ClassicIconButton,
  ValueListMultiSelectLov,
  buildQueryWithPagination,
  useBoolean,
  usePaginationGlobal,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { Search } from '@mui/icons-material'
import { Autocomplete, Grid, LinearProgress, TextField } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

const AutocompleteSigners = ({ form }) => {
  const searchJobTitle = useSearch()
  const [pageSize, setPageSize] = useState(50)
  const [cursor, setCursor] = useState()
  const openValueListJobtitles = useBoolean()

  const onChangeOptions = (_, newValue) => {
    form.setValue('firmantesPorDefecto', newValue)
  }

  const qry = buildQueryWithPagination(pageSize, cursor, searchJobTitle.searchText)

  const { data: jobTitles, isFetching } = useQueryDynamicApi({
    url: `/jobTitles${qry}`,
    baseKey: 'urlUsers',
    isCompanyRequest: true,
  })

  const pagination = usePaginationGlobal(jobTitles, { setPageSize, setCursor }, isFetching)

  return (
    <>
      <Grid
        item
        xs={12}
      >
        <Controller
          name={'firmantesPorDefecto'}
          control={form.control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              multiple
              size='small'
              options={jobTitles?.data ?? []}
              filterOptions={(options) => options}
              onChange={onChangeOptions}
              getOptionLabel={(option) => `${option?.name}` || ''}
              isOptionEqualToValue={(option, value) =>
                `${option?.id}${option?.jobTitle?.id}` === `${value?.id}${value?.jobTitle?.id}`
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='Firmantes por defecto'
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => searchJobTitle.handleSearchText(e.target.value)}
                  InputProps={{
                    ...params?.InputProps,
                    startAdornment: (
                      <>
                        <ClassicIconButton
                          title='Lista de valores'
                          onClick={() => {
                            openValueListJobtitles?.handleShow()
                            searchJobTitle.clearSearch()
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
              noOptionsText={isFetching ? <LinearProgress /> : 'Escribe para buscar'}
            />
          )}
        />
      </Grid>
      {openValueListJobtitles.show && (
        <ValueListMultiSelectLov
          openOptions={openValueListJobtitles}
          columns={[
            {
              field: 'name',
              headerName: 'Nombre',
            },
          ]}
          rows={jobTitles?.data ?? []}
          loading={isFetching}
          pagination={pagination}
          size={'lg'}
          setValue={form.setValue}
          searchOptions={searchJobTitle}
          name={'firmantesPorDefecto'}
          defaultSelected={form.getValues('firmantesPorDefecto')}
        />
      )}
    </>
  )
}

export default AutocompleteSigners
