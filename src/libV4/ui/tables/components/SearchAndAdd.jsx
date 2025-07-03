import { Button } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import GenericTextfield from '../../inputs/GenericTextfield'
import { AccessControl } from '../../../components'

const SearchAndAdd = ({ searchProps, buttonProps, dataSource, children }) => {
  const { isData, ...restButtonProps } = buttonProps || {}

  const handleClickButtonProps = () => {
    if (isData) {
      buttonProps?.onClick?.(dataSource)
      return
    }
    buttonProps?.onClick?.()
  }

  return (
    <>
      {searchProps &&
        Object.keys(searchProps).length > 0 &&
        (searchProps?.privilege ? (
          <AccessControl privilege={searchProps?.privilege}>
            <GenericTextfield
              className={
                buttonProps || children
                  ? 'xs:col-span-12 sm:col-span-6 md:col-span-8 lg:col-span-10'
                  : 'col-span-12'
              }
              label='Buscar'
              {...searchProps}
            />
          </AccessControl>
        ) : (
          <GenericTextfield
            className={
              buttonProps || children
                ? 'xs:col-span-12 sm:col-span-6 md:col-span-8 lg:col-span-10'
                : 'col-span-12'
            }
            label='Buscar'
            {...searchProps}
          />
        ))}
      {children}
      {buttonProps && (
        <>
          {buttonProps?.privilege ? (
            <AccessControl privilege={buttonProps?.privilege}>
              <Button
                className='xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2'
                variant='contained'
                startIcon={<AddCircle />}
                fullWidth
                {...restButtonProps}
                onClick={handleClickButtonProps}
              >
                {buttonProps?.label ?? 'Agregar'}
              </Button>
            </AccessControl>
          ) : (
            <Button
              className='xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2'
              variant='contained'
              startIcon={<AddCircle />}
              fullWidth
              {...restButtonProps}
              onClick={handleClickButtonProps}
            >
              {buttonProps?.label ?? 'Agregar'}
            </Button>
          )}
        </>
      )}
    </>
  )
}

export default SearchAndAdd
