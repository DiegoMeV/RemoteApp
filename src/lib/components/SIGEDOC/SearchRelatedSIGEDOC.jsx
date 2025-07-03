import { SquareIconButton, SwitchInput } from '@/lib/ui'
import { Add } from '@mui/icons-material'
import { Divider, Grid } from '@mui/material'
import { isResponseSIGEDOCInput } from './constants'
import toast from 'react-hot-toast'
import { MagicString } from '@/lib/constants'
import { ItemSearchSIGEDOC } from '.'

const SearchRelatedSIGEDOC = ({ form, fieldArray, disabled }) => {
  const { fields, append, remove } = fieldArray
  const isResponseSigedoc = form?.watch('isResponseSigedoc')

  const fieldsLength = fields.length

  const handleAppend = () => {
    const idItem = crypto.randomUUID()
    const newOption = { id: idItem, label: '', idCadena: '' }
    append(newOption)
  }

  const handleRemove = (position) => {
    if (!isResponseSigedoc || fieldsLength !== 1) {
      remove(position)
      return
    }

    toast.error('No se pudo eliminar, ya que al menos debe tener una búsqueda')
  }

  const INPUT_SIGEDOC = isResponseSIGEDOCInput(disabled)

  return (
    <>
      <Grid
        item
        xs={12}
      >
        <Divider />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <SwitchInput
          item={INPUT_SIGEDOC}
          control={form?.control}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        display={'flex'}
        justifyContent={'flex-end'}
      >
        <SquareIconButton
          text={MagicString.MANAGEMENT.SIGEDOC_SEARCH_ADD_BUTTON}
          tooltip={MagicString.MANAGEMENT.SIGEDOC_SEARCH_ADD_BUTTON_TOOLTIP}
          IconComponent={<Add />}
          onClick={handleAppend}
          disabled={!isResponseSigedoc || disabled}
          sx={{ width: '250px', minWidth: '200px' }}
        />
      </Grid>
      {isResponseSigedoc && fieldsLength >= 1 && (
        <Grid
          item
          xs={12}
          sx={{
            mt: '20px',
            overflow: 'auto',
            maxHeight: '350px',
            border: '0.5px solid gray',
            borderRadius: '10px',
            p: 1,
            ml: 2,
          }}
        >
          {fields.map((itemSearch, index) => {
            return (
              <ItemSearchSIGEDOC
                index={index}
                form={form}
                handleRemove={handleRemove}
                key={itemSearch.id}
                itemSearch={itemSearch}
                disabled={disabled}
              />
            )
          })}
        </Grid>
      )}
    </>
  )
}

export default SearchRelatedSIGEDOC
