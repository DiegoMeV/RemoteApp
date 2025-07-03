import { useEffect, useState } from 'react'
import { Box, Grid, TextField } from '@mui/material'
import { ElementContainer } from '..'
import { MagicString, SquareIconButton, useMutationDynamicBaseUrl } from '@/lib'
import ItemsAssignment from './ItemsAssignment'
import toast from 'react-hot-toast'
import { CardPrevActors } from './componets'

const ElementAddAddProcessActor = ({
  elementAction,
  idTaskAction,
  ids,
  idActivityAction,
  refetchManagement,
  refetchElementActions,
  maxDate,
  setMaxDate,
  activityInfo,
}) => {
  const [formList, setFormList] = useState(
    elementAction?.allActivityActionItems ?? [
      {
        id: crypto.randomUUID(),
        user: '',
        estimatedCompletion: '',
        observation: '',
        isNew: true,
      },
    ]
  )
  useEffect(() => {
    setFormList(
      elementAction?.allActivityActionItems ?? [
        {
          id: crypto.randomUUID,
          user: '',
          estimatedCompletion: '',
          observation: '',
          isNew: true,
        },
      ]
    )
  }, [elementAction])

  const [thereIsNew, setThereIsNew] = useState(elementAction?.allActivityActionItems ? false : true)

  const handleAddForm = () => {
    const newId = crypto.randomUUID()
    setThereIsNew(true)
    setFormList([
      {
        id: newId,
        user: '',
        estimatedCompletion: '',
        observation: '',
        isNew: true,
      },
      ...formList,
    ])
  }
  const { mutateAsync: deleteItem, isPending: deleteLoading } = useMutationDynamicBaseUrl({
    url: `/processes/activity-actions`,
    method: 'DELETE',
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
    onSuccess: () => {
      refetchElementActions()
      toast.success('Elemento eliminado')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
    },
  })

  const handleRemoveForm = (formData) => {
    if (formData?.idActivityAction) {
      deleteItem({ qry: `/${formData?.idActivityAction}/items/${formData?.id}` })
      return
    }
    const newFormList = formList.filter((form) => form.id !== formData?.id)
    setFormList(newFormList)
    setThereIsNew(false)
  }
  const showTaskRel = !!elementAction?.TaskRel

  return (
    <ElementContainer isRequired={elementAction.isRequired}>
      {elementAction?.prevActorsAssigned?.length > 0 && (
        <CardPrevActors elementAction={elementAction} />
      )}
      <Grid
        item
        xs={12}
        display={'flex'}
        gap={2}
      >
        {showTaskRel && (
          <TextField
            label='Actividad a gestionar '
            fullWidth
            size='small'
            value={elementAction?.TaskRel?.name ?? ''}
            InputProps={{
              readOnly: true,
            }}
            sx={{ minWidth: '50%' }}
          />
        )}
        <Box>
          <SquareIconButton
            tooltip={thereIsNew ? 'Debe guardar antes de agregar más elementos' : 'Agregar'}
            color='primary'
            onClick={handleAddForm}
            text={'Agregar'}
            disabled={thereIsNew}
          />
        </Box>
      </Grid>

      {formList?.map((formData) => (
        <ItemsAssignment
          key={formData?.id}
          formData={formData}
          ids={ids}
          handleRemoveForm={handleRemoveForm}
          idActivityAction={idActivityAction}
          refetchElementActions={refetchElementActions}
          refetchManagement={refetchManagement}
          idTaskAction={idTaskAction}
          elementAction={elementAction}
          setThereIsNew={setThereIsNew}
          setMaxDate={setMaxDate}
          maxDate={maxDate}
          deleteLoading={deleteLoading}
          activityInfo={activityInfo}
        />
      ))}
    </ElementContainer>
  )
}

export default ElementAddAddProcessActor
