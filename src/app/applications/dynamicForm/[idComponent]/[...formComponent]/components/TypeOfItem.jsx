import { Controller } from 'react-hook-form'
import { generateElementProps, spanDictionary } from '../funcs'

import { rulesTypeOfItem } from './const'
import FieldRenderer from './RenderItem'

const TypeOfItem = ({
  item,
  newDataDetail,
  blockId,
  form,
  isPendingPushDataForm,
  isControlBlock,
  isDynamicForm,
}) => {
  const { commonProps, specificProps } = generateElementProps({
    item,
    isPendingPushDataForm,
    newDataDetail,
    isControlBlock,
    isDynamicForm,
  })

  const rules = rulesTypeOfItem(item)

  const colSpan = Number(item?.size) || 3
  const size = spanDictionary[colSpan] ?? 'lg:col-span-3'

  return (
    <div className={`w-full xs:col-span-12 md:col-span-6 ${size}`}>
      <Controller
        name={`${blockId}.${item?.id}`}
        defaultValue={item?.defaultValue ?? undefined}
        control={form.control}
        rules={rules}
        render={({ field, fieldState }) => (
          <FieldRenderer
            field={field}
            fieldState={fieldState}
            item={item}
            commonProps={commonProps}
            specificProps={specificProps}
            form={form}
          />
        )}
      />
    </div>
  )
}

export default TypeOfItem
