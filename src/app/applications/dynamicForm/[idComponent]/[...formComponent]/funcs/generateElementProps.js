const generateElementProps = ({
  item,
  newDataDetail,
  isPendingPushDataForm,
  isControlBlock,
  isDynamicForm,
}) => {
  const commonProps = {
    label: item?.isRequired ? `${item?.label} *` : item?.label,
    size: 'small',
    fullWidth: true,
    multiline: item?.multiline || undefined,
    title: item?.tooltip,
    disabled:
      (!newDataDetail && item?.isPk && !isControlBlock) ||
      isPendingPushDataForm ||
      item?.readOnly ||
      item?.disabled ||
      !isDynamicForm,
    event: item?.event,
    typeEvent: item?.typeEvent,
  }

  const specificProps = {
    ...(item?.elementType === 'text' && {
      type: 'text',
      InputLabelProps: { shrink: true },
      InputProps: {
        ...(item?.multiline && {
          minRows: item?.minRows,
          maxRows: item?.maxRows,
        }),
      },
    }),
    ...(item?.elementType === 'integer' && {
      type: 'number',
      InputLabelProps: { shrink: true },
      InputProps: {
        ...(item?.multiline && {
          minRows: item?.minRows,
          maxRows: item?.maxRows,
        }),
      },
    }),
    ...(['select', 'multiSelect'].includes(item?.elementType) && {
      selectItems: item?.selectConfig?.elements,
      multiple: item?.elementType === 'multiSelect',
      dataType: item?.dataType,
      textFieldProps: {
        size: 'small',
        InputLabelProps: { shrink: true },
      },
    }),
    ...(item?.elementType === 'autocomplete' && {
      newDataDetail: newDataDetail,
      autoCompleteConfig: {
        ...item?.autoCompleteConfig,
      },
      textFieldProps: {
        size: 'small',
        InputLabelProps: { shrink: true },
      },
    }),
    ...(item?.elementType === 'date' && {
      format: item?.format,
    }),
    ...(item?.elementType === 'checkbox' && {
      options: item?.selectConfig?.elements ?? [],
    }),
    ...(item?.elementType === 'informative' && {
      text: item?.text ?? '',
      variant: item?.variant ?? '',
    }),
  }

  return { commonProps, specificProps }
}

export default generateElementProps
