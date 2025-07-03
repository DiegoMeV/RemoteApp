import { Grid, TextField } from '@mui/material'

import { AutocompleteValueList, useBoolean, useGetRecord, useSearch } from '@/lib'
import { recordColumns } from '../../funcs'
import { useEffect } from 'react'

const InputsRowOne = ({ form, setValue, watch }) => {
  const inputsModal = useBoolean()
  const inputsBuscar = useSearch()
  const columns = recordColumns()
  const { data: optionsRegistry, isLoading: isLoadingRegistry } = useGetRecord({
    qry: '/byUser',
    searchType: inputsBuscar?.searchText,
  })

  const getLabel = (option) => option?.sigedoc_inclusion

  const valueCat = watch('id_registro_ari')

  const casoCat = optionsRegistry?.data?.find((registro) => {
    return registro?.id === valueCat || registro?.id === valueCat?.id
  })

  useEffect(()=>{
    setValue('id_registro_ari', casoCat)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [casoCat])

  return (
    <Grid
      justifyContent='space-evenly'
      ml={1}
      width='100%'
      spacing={2}
      container
    >
      <AutocompleteValueList
        controlModal={inputsModal}
        control={form.control}
        name='id_registro_ari'
        required={true}
        md={casoCat ? 5.5 : 11.8}
        label='Registro Ari'
        searchText={inputsBuscar}
        setValue={setValue}
        columns={columns}
        options={optionsRegistry}
        loading={isLoadingRegistry}
        getLabel={getLabel}
      />
      {casoCat && (
        <Grid
          item
          xs={12}
          md={6}
          display='flex'
        >
          <TextField
            label='Caso individual (CAT)'
            fullWidth
            variant='outlined'
            value={casoCat?.caso_individual_cat ?? ''}
            InputProps={{
              readOnly: true,
            }}
            size='small'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      )}
    </Grid>
  )
}

export default InputsRowOne
