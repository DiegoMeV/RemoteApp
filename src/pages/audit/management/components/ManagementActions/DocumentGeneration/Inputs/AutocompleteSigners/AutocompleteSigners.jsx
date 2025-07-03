import { Autocomplete, Box, Grid, LinearProgress, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  ClassicIconButton,
  ValueListMultiSelect,
  buildQueryWithPagination,
  useBoolean,
  useGetUsers,
  usePaginationModelParams,
  useSearch,
} from '@/lib'
import { Controller } from 'react-hook-form'
import { CustomOption, HeaderOptions, TableSigners } from '.'
import { signersData } from '../../../funcs'
import { columnsValueListSigners } from './funcs'
import { Search } from '@mui/icons-material'

const AutocompleteSigners = ({ control, setValue, firmantes, defaultSigners }) => {
  const defaultSignersArray = defaultSigners?.[0]?.usuarioData

  const searchUsers = useSearch()
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })
  const [cursor, setCursor] = useState()
  const [enableRequest, setEnableRequest] = useState(false)
  const [selectSigners, setSelectSigners] = useState([])
  const [signersTransform, setSignersTransform] = useState([])
  const openValueListFunctionary = useBoolean()

  const qry = buildQueryWithPagination(paginationModel?.pageSize, cursor, searchUsers.searchText)

  const { data: signers, isLoading } = useGetUsers({
    qry: `${qry}&isActive=true${
      defaultSigners?.[0]?.idCargo ? `&idJobTitle=${defaultSigners?.[0]?.idCargo}` : ''
    }`,
    enabled: enableRequest || openValueListFunctionary.show,
  })

  useEffect(() => {
    if (firmantes) {
      const initialSigners = signersData(firmantes)
      setSelectSigners(initialSigners)
      return
    }
    if (defaultSignersArray) {
      const adaptUser = defaultSignersArray ? signersData([defaultSignersArray]) : null
      setSelectSigners(adaptUser)
    }
  }, [defaultSignersArray, firmantes])

  useEffect(() => {
    const newSignersStructure = signersData(signers?.data)
    setSignersTransform(newSignersStructure)
  }, [signers])

  const onChangeOptions = (_, newValue) => {
    const datauser = newValue.map((user) => {
      return {
        idUser: user?.idUser ?? '',
        idJoin: user?.jobTitles?.id ?? '',
        dependencyId: user?.jobTitles?.dependencyId ?? '',
      }
    })
    setValue('firmantes', datauser)
    setSelectSigners(newValue)
  }

  const enableRequestFunction = () => {
    if (!enableRequest) {
      setEnableRequest(true)
    }
  }

  const handleOpenVL = () => {
    openValueListFunctionary?.handleShow()
    setPaginationModel((prev) => ({ ...prev, pageSize: 50 }))

    searchUsers.clearSearch()
  }

  const pagination = usePaginationModelParams(
    signers,
    isLoading,
    setCursor,
    paginationModel,
    setPaginationModel
  )

  return (
    <>
      <Grid
        item
        xs={12}
      >
        <Controller
          name={'firmantes'}
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              multiple
              options={signersTransform ?? []}
              value={selectSigners ?? []}
              filterOptions={(options) => options}
              onChange={onChangeOptions}
              getOptionLabel={(option) => `${option?.firstName ?? ''} ${option?.lastName ?? ''}`}
              isOptionEqualToValue={(option, value) =>
                `${option?.id}${option?.jobTitle?.id}` === `${value?.id}${value?.jobTitle?.id}`
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='Buscar Firmantes'
                  placeholder='Buscar Firmantes'
                  InputLabelProps={{ shrink: true }}
                  onClick={enableRequestFunction}
                  onChange={(e) => searchUsers.handleSearchText(e.target.value)}
                  InputProps={{
                    ...params?.InputProps,
                    startAdornment: (
                      <>
                        <ClassicIconButton
                          title='Lista de valores'
                          onClick={handleOpenVL}
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
              groupBy={() => 'All Options'}
              renderGroup={(params) => (
                <Box key='header-options'>
                  <HeaderOptions params={params} />
                </Box>
              )}
              renderOption={(props, option) => {
                const { key, ...rest } = props
                return (
                  <Box
                    key={`${option.id}${option?.jobTitle?.id}`}
                    {...rest}
                  >
                    <CustomOption
                      key={key}
                      option={option}
                    />
                  </Box>
                )
              }}
              noOptionsText={isLoading ? <LinearProgress /> : 'Escribe para buscar'}
            />
          )}
        />
      </Grid>
      {openValueListFunctionary.show && (
        <ValueListMultiSelect
          size={'lg'}
          openOptions={openValueListFunctionary}
          columns={columnsValueListSigners}
          rows={signersTransform}
          loading={isLoading}
          setSelectSigners={setSelectSigners}
          selectSigners={selectSigners}
          setValue={setValue}
          searchUsers={searchUsers}
          pagination={pagination}
        />
      )}
      <TableSigners signersRows={selectSigners} />
    </>
  )
}

export default AutocompleteSigners
