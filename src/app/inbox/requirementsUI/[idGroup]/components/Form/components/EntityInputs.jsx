import {
  AutocompleteValueList,
  ClassicIconButton,
  CustomTextField,
  MagicString,
  useBoolean,
  useSearch,
} from '@/lib'
import { Delete } from '@mui/icons-material'
import { Box, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const EntityInputs = ({
  getValues,
  index,
  control,
  filteredRowsEntities,
  isLoading,
  setValue,
  remove,
  size
}) => {

  const { fieldsLength } = size

  const textInputType = (name, label, readOnly) => {
    return {
      name: name,
      label: label,
      required: true,
      readOnly,
      sx: { width: '100%', minWidth: '100px' },
    }
  }

  const modalEntities = useBoolean()
  const searchEntities = useSearch()

  const currentValues = getValues()

  const columns = [
    { field: 'name', headerName: 'Entidad', width: 150 },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
  ]

  const emailItem = textInputType(`entities.${index}.emails`, 'Emails relacionados', false)

  const [modalValue, setModalValue] = useState(currentValues?.entities[index]?.entity ?? {})

  const handleRemove = (position) => {
    if (fieldsLength !== 1) {
      remove(position)
      //TODO: REPARAR ESTO
      //ESTO HACE QUE FUNCIONE, PERO NO COMO DEBERIA
      // setValue(`entities.${position}.entity`, {})
      // setValue(`entities.${position}.emails`, '')
      return
    }

    toast.error(MagicString.REGISTRY.REMOVE_ALERT_MESSAGE)
  }

  useEffect(()=>{
    if(modalValue){
      const dato = filteredRowsEntities?.data?.find((r)=>{
        return r.id === modalValue.id
      })
      setValue(`entities.${index}.entity`, dato ?? {})
      setValue(`entities.${index}.emails`, modalValue?.email ?? '')
    } else {
      setValue(`entities.${index}.entity`, {})
      setValue(`entities.${index}.emails`, '')
    }
  }, [modalValue, index, setValue, filteredRowsEntities?.data])

  return (
    <Box
      display='flex'
      gap={1}
      py={1}
      px={1}
    >
      <AutocompleteValueList
        controlModal={modalEntities}
        control={control}
        name={`entities.${index}.entity`}
        md={6}
        label='Seleccion Entidad externa'
        options={filteredRowsEntities ?? []}
        loading={isLoading ?? false}
        searchText={searchEntities}
        setValue={setValue}
        columns={columns}
        getValues={setModalValue}
        required={true}
      />
      <Grid item md={6}>
        <CustomTextField
          item={emailItem}
          control={control}
        />
      </Grid>
      <ClassicIconButton
        onClick={() => handleRemove(index)}
        title={'Eliminar'}
        placement={'bottom'}
      >
        <Delete />
      </ClassicIconButton>
      
    </Box>
  )
}

export default EntityInputs
