import { forwardRef } from 'react'
import { useBoolean, ValueListQuery } from '../modals'
import { GenericTextfield } from '.'
import { IconButton } from '@mui/material'
import { Close, Search } from '@mui/icons-material'

const TextFieldQuery = forwardRef(function TextFieldQuery(
  {
    lovTitle,
    queryProps,
    tableProps = {
      columns: [],
    },
    ...rest
  },
  ref
) {
  const { show, handleShow, handleShowConfirm } = useBoolean({
    confirmModalProps: {
      icon: 'warning',
      title: '¿Está seguro de cerrar el modal?',
    },
  })

  const selectedOption = (params) => {
    rest?.onChange?.(null, params)
  }

  return (
    <>
      <GenericTextfield
        ref={ref}
        {...rest}
        multiline={false}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <IconButton
              color='primary'
              onClick={handleShow}
              size='small'
            >
              <Search />
            </IconButton>
          ),
          endAdornment: (
            <IconButton
              onClick={() => {
                selectedOption(null)
              }}
            >
              <Close />
            </IconButton>
          ),
        }}
      />
      {show && (
        <ValueListQuery
          show={show}
          handleShow={handleShow}
          handleShowConfirm={handleShowConfirm}
          selectedOption={selectedOption}
          queryProps={queryProps}
          tableProps={tableProps}
          title={lovTitle}
        />
      )}
    </>
  )
})
TextFieldQuery.displayName = 'TextFieldQuery'

export default TextFieldQuery
