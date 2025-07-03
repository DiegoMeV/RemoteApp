import { AutocompleteValueList, CustomTextField, useBoolean, useSearch } from '@/lib'
import { Box } from '@mui/material'
import { ItemBtnAlert } from '.'
import { useEffect, useState } from 'react'
import { searchAlertRows, setItemAlertCurrentValue, textInputType } from '../funcs'

const ItemAlert = ({ index, columns, additionalInfo, modifiableVars }) => {
  const { setValue, alertsInfo, handleOpenEditAlert } = modifiableVars
  const { isLoading, getValues, control } = additionalInfo

  const modalAlerts = useBoolean()

  const searchAlerts = useSearch()

  const currentValues = getValues()

  const [modalValue, setModalValue] = useState(currentValues?.alerts[index]?.identifier ?? {})

  const [completeRows, setCompleteRows] = useState({ data: [] })
  const [filteredRows, setFilteredRows] = useState({ data: [] })

  useEffect(() => {
    setItemAlertCurrentValue(modalValue, index, setValue, alertsInfo?.data)
  }, [modalValue, index, setValue, alertsInfo?.data])

  const modeloItem = textInputType(`alerts.${index}.modelo`, 'Modelo Alerta')
  const initialDateItem = textInputType(`alerts.${index}.initialDate`, 'Fecha inicio')
  const alertItem = textInputType(`alerts.${index}.alert`, 'Alerta')

  useEffect(() => {
    if (alertsInfo?.data) {
      setCompleteRows({ data: alertsInfo?.data ?? [] })
      setFilteredRows({ data: alertsInfo?.data ?? [] })
    }
  }, [alertsInfo])

  useEffect(() => {
    if (completeRows?.data) {
      searchAlertRows(searchAlerts.searchText, completeRows?.data, setFilteredRows)
    }
  }, [searchAlerts.searchText, completeRows])

  return (
    <Box
      display='flex'
      gap={1}
      py={2}
    >
      <AutocompleteValueList
        controlModal={modalAlerts}
        control={control}
        name={`alerts.${index}.identifier`}
        md={4}
        label='Alerta a radicar'
        options={filteredRows ?? []}
        loading={isLoading ?? false}
        searchText={searchAlerts}
        setValue={setValue}
        columns={columns}
        getValues={setModalValue}
      />
      <CustomTextField
        item={alertItem}
        control={control}
      />
      <CustomTextField
        item={modeloItem}
        control={control}
      />
      <CustomTextField
        item={initialDateItem}
        control={control}
      />
      <ItemBtnAlert
        alert={currentValues?.alerts[index]?.identifier}
        indexAlert={index}
        handleOpenEditModal={handleOpenEditAlert}
      />
    </Box>
  )
}

export default ItemAlert
