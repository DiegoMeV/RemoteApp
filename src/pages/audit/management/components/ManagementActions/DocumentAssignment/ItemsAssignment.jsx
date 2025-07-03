import {
  BackdropLoading,
  GenericDatePicker,
  ValueListGroup,
  buildQueryStringUserService,
  useAllUserInfo,
  useBoolean,
  usePagination,
  useSearch,
} from '@/lib'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useProcessFunctions, useProcessModifyItem } from '../hooks'
import { adaptDefaultValuesToAssigment, columnsValueListUsers, dataForUpdateProcess } from './funcs'
import { Grid } from '@mui/material'
import { AutocompleteSelect } from '../AutocompleteOfficial'
import ItemOptions from './ItemOptions'
import dayjs from 'dayjs'

const ItemsAssignment = ({
  formData,
  ids,
  handleRemoveForm,
  idActivityAction,
  refetchElementActions,
  refetchManagement,
  idTaskAction,
  elementAction,
  setThereIsNew,
  setMaxDate,
  maxDate,
  deleteLoading,
  activityInfo,
}) => {
  const [idProcess, idActivity] = ids || []

  const defaultValues = adaptDefaultValuesToAssigment(formData)

  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: defaultValues,
  })
  const openValueListFunctionary = useBoolean()

  const resetNewState = () => {
    if (formData?.isNew) {
      setThereIsNew(false)
    }
  }

  const searchUserFun = useSearch()
  const [cursor, setCursor] = useState()
  const [pageSize, setPageSize] = useState(10)
  const paramsFilter = {
    pageSize,
    cursor,
    isActive: true,
    setCursor,
    setPageSize,
  }

  const qry = buildQueryStringUserService(pageSize, cursor, searchUserFun.searchText)

  const { data: usersInfo, isLoading: loadingUsers } = useAllUserInfo({
    qry: `${qry}&isActive=true`,
  })

  const optionsAutocomplete = []

  usersInfo?.data.forEach((usuario) => {
    usuario.jobTitles.forEach((jobTitle) => {
      optionsAutocomplete.push({
        hierarchy: ` ${usuario?.firstName ?? ''} ${usuario?.lastName || ''}`,
        jobTitle: jobTitle?.name ?? '',
        id: jobTitle?.id ?? '',
        idUser: usuario?.id ?? '',
        depencyName: jobTitle?.depencyName ?? '',
      })
    })
  })

  const pagination = usePagination(usersInfo, paramsFilter, loadingUsers)
  const [disabledButton, setDisabledButton] = useState(false)

  const { modifyItemInformation, loadingItemCreation } = useProcessModifyItem(
    idActivityAction,
    refetchElementActions,
    resetNewState,
    setDisabledButton
  )

  const onSuccessUpdateProcess = (response) => {
    const qry = response?.data?.id ? `${response?.data?.id}/items` : ''
    const data = getValues()
    const body = dataForUpdateProcess(
      elementAction,
      data,
      activityInfo?.[0]?.actionsToPerform?.[0]?.showEstimatedDate
    )
    if (maxDate === undefined) {
      setMaxDate(data.estimatedCompletion)
    }
    modifyItemInformation({ qry, body })
    refetchManagement()
  }

  const { updateProcess, isPendingUpdateProcess } = useProcessFunctions(
    idProcess,
    idActivity,
    refetchManagement,
    null,
    onSuccessUpdateProcess,
    setDisabledButton
  )
  const onSubmit = (data) => {
    if (!idActivityAction) {
      updateProcess({ body: { idTaskAction: idTaskAction } })
    } else {
      const isEdition = formData?.isNew
      const methodBody = isEdition ? 'post' : 'put'
      const qry = isEdition ? '' : `/${formData?.id}`
      const body = dataForUpdateProcess(
        elementAction,
        data,
        activityInfo?.[0]?.actionsToPerform?.[0]?.showEstimatedDate
      )
      modifyItemInformation({ qry, methodBody, body })
    }
  }

  return (
    <Grid
      component='form'
      item
      container
      xs={12}
      key={formData?.id}
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <BackdropLoading loading={loadingItemCreation || isPendingUpdateProcess} />
      <Grid
        item
        xs={12}
        md={!activityInfo?.[0]?.actionsToPerform?.[0]?.showEstimatedDate ? 11 : 5.5}
      >
        <AutocompleteSelect
          name={`user`}
          label='Funcionario'
          options={optionsAutocomplete ?? []}
          isLoading={loadingUsers}
          control={control}
          handleSearch={searchUserFun?.handleSearchText}
          setValue={setValue}
          openValueList={openValueListFunctionary}
          selectedUser={(newValue) => {
            setValue(`user`, newValue)
          }}
          required={true}
        />
        <ValueListGroup
          openOptions={openValueListFunctionary}
          columns={columnsValueListUsers}
          searchOptions={searchUserFun}
          rows={optionsAutocomplete}
          selectedOption={(newValue) => {
            setValue(`user`, newValue)
          }}
          pagination={pagination}
        />
      </Grid>
      {activityInfo?.[0]?.actionsToPerform?.[0]?.showEstimatedDate && (
        <Grid
          item
          xs={12}
          md={5.5}
        >
          <Controller
            name={`estimatedCompletion`}
            control={control}
            rules={{
              required: 'Este campo es requerido',
              validate: {
                isBeforeMaxDate: (value) =>
                  !maxDate ||
                  dayjs(value).isBefore(dayjs(maxDate).add(1, 'day')) ||
                  `La fecha no debe ser posterior a ${dayjs(maxDate).format('DD-MM-YYYY')}`,
              },
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <GenericDatePicker
                  {...field}
                  datePickerProps={{
                    ...field,
                    maxDate: dayjs(maxDate ?? ''),
                  }}
                  textFieldProps={{
                    error: !!error,
                    helperText: error ? error.message : '',
                  }}
                />
              )
            }}
          />
        </Grid>
      )}

      <ItemOptions
        handleRemoveForm={handleRemoveForm}
        formData={formData}
        control={control}
        disabledButton={disabledButton}
        deleteLoading={deleteLoading}
      />
    </Grid>
  )
}

export default ItemsAssignment
