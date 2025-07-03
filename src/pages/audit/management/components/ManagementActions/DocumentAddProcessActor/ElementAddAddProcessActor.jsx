import { Box, Button, Grid } from '@mui/material'
import { ElementContainer, CustomTextfield } from '..'
import {
  BackdropLoading,
  ValueListGroup,
  buildQueryStringUserService,
  useAllUserInfo,
  useBoolean,
  usePagination,
  useSearch,
} from '@/lib'
import { useForm } from 'react-hook-form'
import { Save } from '@mui/icons-material'
import { useState } from 'react'
import { useProcessFunctions, useProcessModifyItem } from '../hooks'
import {
  adaptDefaultValuesToAddProcessActor,
  columnsValueListUsers,
  dataForUpdateProcess,
} from './funcs'
import { AutocompleteSelect } from '../AutocompleteOfficial'
import { selectedUser } from '../funcs'
import CardPrevActor from './CardPrevActor'

const ElementAddAddProcessActor = ({
  elementAction,
  idTaskAction,
  idActivityAction,
  ids,
  refetchManagement,
  refetchElementActions,
}) => {
  const defaultValues = adaptDefaultValuesToAddProcessActor(elementAction?.activityActionItemData)

  const [idProcess, idActivity] = ids || []
  const { control, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: defaultValues,
  })
  const openValueListFunctionary = useBoolean()
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
  const pagination = usePagination(usersInfo, paramsFilter, loadingUsers)

  const optionsAutocomplete = []

  usersInfo?.data.forEach((usuario) => {
    usuario.jobTitles.forEach((jobTitle) => {
      optionsAutocomplete.push({
        hierarchy: ` ${usuario.firstName} ${usuario.lastName || ''}`,
        jobTitle: jobTitle.name,
        id: jobTitle.id,
        idUser: usuario.id,
        depencyName: jobTitle.depencyName,
      })
    })
  })

  const { modifyItemInformation, loadingItemCreation } = useProcessModifyItem(
    idActivityAction,
    refetchElementActions
  )

  const onSuccessUpdateProcess = (response) => {
    const qry = response?.data?.id ? `${response?.data?.id}/items` : ''
    const data = getValues()
    const body = dataForUpdateProcess(elementAction, data)
    modifyItemInformation({ qry, body })
  }

  const { updateProcess, isPendingUpdateProcess } = useProcessFunctions(
    idProcess,
    idActivity,
    refetchManagement,
    null,
    onSuccessUpdateProcess
  )

  const onSubmit = (data) => {
    if (!idActivityAction) {
      updateProcess({ body:{idTaskAction} })
      return
    }
    const body = dataForUpdateProcess(elementAction, data)
    modifyItemInformation({
      body,
    })
  }

  const showTaskRel = !!elementAction?.TaskRel

  const idUser = watch('user')?.idUser

  return (
    <Box
      key={elementAction?.id}
      component='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <ElementContainer isRequired={elementAction.isRequired}>
        {elementAction?.prevActorsAssigned?.length > 0 && (
          <CardPrevActor
            elementAction={elementAction}
            idActorType={elementAction?.idActorType}
            keyActorType={elementAction?.ActorType?.keyName}
            idProcess={idProcess}
            refetchElementActions={refetchElementActions}
          />
        )}

        <BackdropLoading loading={isPendingUpdateProcess || loadingItemCreation} />
        {showTaskRel && (
          <CustomTextfield
            lg={5}
            label='Actividad a gestionar'
            value={elementAction?.TaskRel?.name ?? ''}
          />
        )}
        <Grid
          item
          xs={12}
          md={showTaskRel ? 6 : 8}
          lg={showTaskRel ? 5 : 10}
          display='flex'
        >
          <AutocompleteSelect
            name='user'
            label='Funcionario'
            options={optionsAutocomplete ?? []}
            isLoading={loadingUsers}
            control={control}
            handleSearch={searchUserFun?.handleSearchText}
            setValue={setValue}
            openValueList={openValueListFunctionary}
            selectedUser={selectedUser}
            required={true}
          />
          <ValueListGroup
            openOptions={openValueListFunctionary}
            columns={columnsValueListUsers}
            searchOptions={searchUserFun}
            rows={optionsAutocomplete}
            selectedOption={(newValue) => {
              selectedUser(newValue, setValue)
            }}
            pagination={pagination}
          />
        </Grid>

        <Grid
          item
          container
          xs={12}
          md={showTaskRel ? 12 : 4}
          lg={2}
          justifyContent='flex-end'
        >
          <Button
            startIcon={<Save />}
            variant='contained'
            type='submit'
            disabled={!idUser}
          >
            Guardar
          </Button>
        </Grid>
      </ElementContainer>
    </Box>
  )
}

export default ElementAddAddProcessActor
