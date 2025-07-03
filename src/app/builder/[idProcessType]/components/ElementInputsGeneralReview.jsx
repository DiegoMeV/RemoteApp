import { AutocompleteNoForm, useGetAllActivities } from '@/lib'
import { Box } from '@mui/material'
import { ModalSearchDocuments } from '.'

const ElementInputsGeneralReview = ({
  columnsForApproved,
  columnsForRejected,
  value,
  setValue,
  openApproved,
  openRejected,
  handleOpenCloseApproved,
  handleOpenCloseRejected
}) => {
  const { data: activities, isLoading: loadingActivities } = useGetAllActivities()

  const onChangeActivity = (option) => {
    if (!option) {
      setValue((prev) => ({ ...prev, idTaskOnApproved: null, nameTaskOnApproved: null }))
      return
    }
    setValue((prev) => ({
      ...prev,
      idTaskOnApproved: option?.id,
      nameTaskOnApproved: option?.name,
    }))
  }

  const onChangeTaskOnRejected = (option) => {
    if (!option) {
      setValue((prev) => ({ ...prev, idTaskOnRejected: null, nameTaskOnRejected: null }))
      return
    }
    setValue((prev) => ({
      ...prev,
      idTaskOnRejected: option?.id,
      nameTaskOnRejected: option?.name,
    }))
  }

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        marginBottom='20px'
        width='100%'
        gap='10px'
      >
        <AutocompleteNoForm
          options={activities?.data ?? []}
          isLoading={loadingActivities}
          onChange={onChangeActivity}
          value={{ id: value?.idTaskOnApproved, name: value?.nameTaskOnApproved }}
          label='Actividad siguiente cuando aprobación'
          openModal={handleOpenCloseApproved}
        />
        {openApproved && (
          <ModalSearchDocuments
            columns={columnsForApproved}
            open={openApproved}
            handleClose={handleOpenCloseApproved}
            title={'Buscar actividad'}
            //TODO: This actionType has to be GENERAL
            actionType={'ASSIGNMENT'}
          />
        )}
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        marginBottom='20px'
        width='100%'
        gap='10px'
      >
        <AutocompleteNoForm
          options={activities?.data ?? []}
          isLoading={loadingActivities}
          onChange={onChangeTaskOnRejected}
          value={{ id: value?.idTaskOnRejected, name: value?.nameTaskOnRejected }}
          label='Actividad siguiente cuando rechazo'
          openModal={handleOpenCloseRejected}
        />
        {openRejected && (
          <ModalSearchDocuments
            columns={columnsForRejected}
            open={openRejected}
            handleClose={handleOpenCloseRejected}
            title={'Buscar actividad'}
            actionType={'ASSIGNMENT'}
          />
        )}
      </Box>
    </>
  )
}

export default ElementInputsGeneralReview
