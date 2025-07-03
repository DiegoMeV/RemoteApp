import { Box, Button, Grid } from '@mui/material'
import { ElementContainer, CustomTextfield } from '..'
import {
  BackdropLoading,
  ValueListGroup,
  buildQueryStringUserService,
  useAllUserInfo,
  useBoolean,
  useMutationDynamicBaseUrl,
  usePagination,
  useSearch,
} from '@/lib'
import { useForm } from 'react-hook-form'
import { Delete, Save } from '@mui/icons-material'
import { useState } from 'react'
import { useProcessModifyItem } from '../hooks'
import {
  adaptDefaultValuesToAddProcessActor,
  columnsValueListUsers,
  dataForUpdateProcess,
} from './funcs'
import { AutocompleteSelect } from '../AutocompleteOfficial'
import { selectedUser } from '../funcs'
import CardPrevActor from './CardPrevActor'

const ElementAddAddProcessActor = ({
  idAction,
  elementAction,
  idActivityAction,
  ids,
  refetchElementActions,
}) => {
  const [elementActionLocal, setElementActionLocal] = useState(elementAction)

  const defaultValues = adaptDefaultValuesToAddProcessActor(
    elementActionLocal?.activityActionItemData
  )

  const [idProcess, idActivity] = ids || []

  const { control, handleSubmit, setValue, reset, watch } = useForm({
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

  const { mutateAsync: performAction, isPending: updatingItemAction } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/activities/${idActivity}/items-to-perform/${idAction}`,
    method: 'get',
    onSuccess: (response) => {
      setElementActionLocal(response?.data?.[0])
    },
    onError: () => {
      refetchElementActions()
    },
  })

  const { mutateAsync: deleteActor, isPending: deletingActor } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    url: `/processes/activity-actions/${idActivityAction}/items/${elementActionLocal?.activityActionItemData?.id}`,
    method: 'delete',
    onSuccess: () => {
      performAction({ qry: `?idTaskActionItem=${elementAction.id}` })
      reset()
    },
    onError: () => {
      refetchElementActions()
    },
  })

  const onSuccessAditional = async (response) => {
    performAction({ qry: `?idTaskActionItem=${response?.data?.idTaskActionItem}` })
  }

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
    null,
    onSuccessAditional
  )

  const onSubmit = (data) => {
    const body = dataForUpdateProcess(elementActionLocal, data)
    modifyItemInformation({
      body,
    })
  }

  const showTaskRel = !!elementActionLocal?.TaskRel

  const idUser = watch('user')?.idUser

  return (
    <Box
      key={elementActionLocal?.id}
      component='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <ElementContainer
        isRequired={elementActionLocal.isRequired}
        sx={{
          position: 'relative',
        }}
      >
        <BackdropLoading
          loading={loadingItemCreation || updatingItemAction || deletingActor}
          sizeLoading={80}
          sx={{
            position: 'absolute',
            borderRadius: '5px',
            zIndex: 1,
          }}
        />
        {elementActionLocal?.prevActorsAssigned?.length > 0 && (
          <CardPrevActor
            elementAction={elementActionLocal}
            idActorType={elementActionLocal?.idActorType}
            keyActorType={elementActionLocal?.ActorType?.keyName}
            idProcess={idProcess}
            refetchElementActions={refetchElementActions}
          />
        )}

        {showTaskRel && (
          <CustomTextfield
            lg={4}
            label='Actividad a gestionar'
            value={elementAction?.TaskRel?.name ?? ''}
          />
        )}
        <Grid
          item
          xs={12}
          md={showTaskRel ? 6 : 8}
          lg={showTaskRel ? 4 : 9}
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
            disabled={!!defaultValues?.user?.id}
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
          lg={showTaskRel ? 4 : 3}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
          }}
        >
          <Button
            startIcon={<Delete />}
            variant='contained'
            disabled={!defaultValues?.user?.id}
            onClick={deleteActor}
          >
            Borrar
          </Button>
          <Button
            startIcon={<Save />}
            variant='contained'
            type='submit'
            disabled={!idUser || !!defaultValues?.user?.id}
          >
            Guardar
          </Button>
        </Grid>
      </ElementContainer>
    </Box>
  )
}

export default ElementAddAddProcessActor
