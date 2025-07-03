import { useEffect, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'

const SelectGroup = ({ processGroups, idSelected, setIdSelected, errorInfo }) => {
  const { processGroupsData, isLoading, isError } = processGroups
  const structGroup = (infoGroups) => {
    if (infoGroups?.data?.length !== 0) {
      const completeInfo = infoGroups?.data.map((app) => {
        return app?.groups?.map((group) => {
          return {
            ...group,
            parentName: app.name,
            parentId: app.id,
          }
        })
      })
      const dataGroupStruct = completeInfo.reduce((acum, element) => acum.concat(element), [])
      setGroups(dataGroupStruct)
    }
  }

  useEffect(() => {
    if (processGroupsData) {
      structGroup(processGroupsData)
    }
  }, [processGroupsData])
  const [groups, setGroups] = useState([])
  const [chooseGroup, setChooseGroup] = useState('')

  return (
    <Autocomplete
      noOptionsText='No existen grupos de aplicaciones'
      fullWidth
      options={groups ?? []}
      getOptionLabel={(option) => option?.name || ''}
      groupBy={(option) => option?.parentName || ''}
      inputValue={chooseGroup}
      isOptionEqualToValue={(option, value) => option?.name === value?.name}
      value={idSelected}
      onInputChange={(ev, newInputValue) => {
        setChooseGroup(newInputValue)
      }}
      onChange={(ev, newInputValue) => {
        setIdSelected(newInputValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Seleccione un grupo'
          disabled={isLoading || isError || !processGroupsData}
          error={isError || (errorInfo && !idSelected)}
          required={true}
          helperText={
            isError
              ? 'ha ocurrido un error, estamos trabajando en ello.'
              : errorInfo && !idSelected && 'Debe seleccionar un grupo'
          }
        />
      )}
    />
  )
}

export default SelectGroup
