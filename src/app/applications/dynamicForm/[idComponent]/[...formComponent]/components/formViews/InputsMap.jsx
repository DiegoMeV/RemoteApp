import { Button } from '@mui/material'
import { TypeOfItem } from '..'
import { safeExecute } from '@/lib'

const InputsMap = ({
  blockId,
  newDataDetail,
  isPendingPushDataForm,
  items,
  form,
  isControlBlock,
  isDynamicForm,
}) => {
  const filterItems = items?.filter((item) => item?.id !== 'nit_compania' && !item?.hidden)
  const [nonButtonItems, buttonItems] = (filterItems ?? []).reduce(
    ([nonButtonItems, buttonItems], item) => {
      item.elementType !== 'button' ? nonButtonItems.push(item) : buttonItems.push(item)
      return [nonButtonItems, buttonItems]
    },
    [[], []]
  )
  const buttonsLength = buttonItems?.length > 0
  return (
    <section className='max-h-[calc(100vh-190px)] overflow-auto grid grid-cols-12 p-4 bg-white rounded-lg shadow-lg border space-x-4'>
      <div
        className={`max-h-[calc(80vh-190px)] overflow-auto xs:col-span-12 md:col-span-6 ${
          buttonsLength ? 'lg:col-span-9' : 'lg:col-span-12'
        } p-4`}
      >
        <div className='grid grid-cols-12 gap-4'>
          {nonButtonItems?.map((item, index) => (
            <TypeOfItem
              key={`${item?.id}-${index}`}
              newDataDetail={newDataDetail}
              isPendingPushDataForm={isPendingPushDataForm}
              blockId={blockId}
              item={item}
              form={form}
              isControlBlock={isControlBlock}
              isDynamicForm={isDynamicForm}
            />
          ))}
        </div>
      </div>

      {buttonsLength && (
        <div className='py-4 col-span-3 max-h-[calc(80vh-190px)] overflow-auto border-l gap-4'>
          <div className='grid grid-cols-1 gap-4 px-3'>
            {buttonItems?.map((item, index) => {
              return (
                <Button
                  key={`${item?.id}-${index}`}
                  variant='contained'
                  fullWidth
                  disabled={isPendingPushDataForm}
                  sx={{ maxHeight: '40px' }}
                  onClick={() => safeExecute(item?.event)}
                >
                  {item?.label}
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}

export default InputsMap
