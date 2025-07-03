import { Button, CircularProgress } from '@mui/material'
import InputsMap from './InputsMap'

const FormView = ({
  blockId,
  newDataDetail,
  isPendingPushDataForm,
  onSubmit,
  items,
  form,
  isGetDataEditPending,
  loadingDataToRQ,
  isControlBlock,
  isDynamicForm,
}) => {
  return (
    <>
      {isGetDataEditPending || loadingDataToRQ ? (
        <CircularProgress />
      ) : (
        <form className='p-2 space-y-4'>
          <InputsMap
            items={items}
            newDataDetail={newDataDetail}
            isPendingPushDataForm={isPendingPushDataForm}
            form={form}
            blockId={blockId}
            isControlBlock={isControlBlock}
            isDynamicForm={isDynamicForm}
          />
          {!isControlBlock && (
            <div className='w-full flex justify-end'>
              <div className='w-1/6'>
                <Button
                  onClick={onSubmit}
                  variant='contained'
                  disabled={isPendingPushDataForm}
                  color='primary'
                  fullWidth
                >
                  {isPendingPushDataForm ? <CircularProgress size={20} /> : 'Guardar'}
                </Button>
              </div>
            </div>
          )}
        </form>
      )}
    </>
  )
}

export default FormView
