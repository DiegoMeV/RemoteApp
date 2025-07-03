import { Add } from '@mui/icons-material'
import { Alert, Box, Button, TextField } from '@mui/material'
import FormCreateLov from './FormCreateLov'

const textConfig = {
  textMin: 'Mínimo de caracteres permitidos',
  textMax: 'Máximo de caracteres permitidos',
  type: 'number',
}

const config = {
  longText: textConfig,
  shortText: textConfig,
  number: {
    textMin: 'Valor mínimo deseado',
    textMax: 'Valor máximo deseado',
    type: 'number',
  },
  date: {
    title: 'Fecha minima',
    title2: 'Fecha maximas',
    textMin: 'Fecha mínima',
    textMax: 'Fecha máxima',
    type: 'date',
  },
  lov: {
    title: 'Ingrese label',
    type: 'text',
  },
}

const handleAppend = (append) => {
  const idItem = crypto.randomUUID()
  const newOption = { id: idItem, label: '', value: '' }
  append(newOption)
}

const RageInputs = ({
  value,
  optionsInputLocal,
  setOptionsInputLocal,
  control,
  fields,
  append,
  remove,
}) => {
  const { textMin, textMax, type, title } = config[value.variableType] || {}
  const handleChange = (e) => {
    const { name, value } = e.target
    setOptionsInputLocal((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Box
      width='100%'
      height='100%'
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      {JSON.stringify(value.options) !== JSON.stringify(optionsInputLocal) && (
        <Box
          marginBottom='10px'
          display='flex'
          justifyContent='center'
        >
          <Alert severity='warning'>Hay cambios que faltan por guardar.</Alert>
        </Box>
      )}
      {value && value.variableType !== 'lov' ? (
        <Box
          gap={3}
          display='flex'
          width='100%'
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <TextField
            id={`${value.variableType}-outlined-sizeDoc-min`}
            label={textMin}
            type={type}
            name='min'
            variant='outlined'
            fullWidth
            value={optionsInputLocal.min}
            onChange={handleChange}
            InputLabelProps={type === 'date' ? { shrink: true } : {}}
          />
          <TextField
            id={`${value.variableType}-outlined-sizeDoc-max`}
            label={textMax}
            type={type}
            name='max'
            variant='outlined'
            fullWidth
            value={optionsInputLocal.max}
            onChange={handleChange}
            InputLabelProps={type === 'date' ? { shrink: true } : {}}
          />
        </Box>
      ) : (
        <Box
          width='100%'
          maxHeight='200px'
        >
          <Box
            width='100%'
            display={'flex'}
            justifyContent='flex-end'
            mb={1}
          >
            <Button
              variant='outlined'
              onClick={() => handleAppend(append)}
              startIcon={<Add />}
              size='small'
            >
              Agregar opcion
            </Button>
          </Box>
          {fields.map((option, i) => {
            return (
              <FormCreateLov
                option={option}
                key={option.id}
                index={i}
                titleFirstInput={title}
                remove={remove}
                fieldsLength={fields.length}
                control={control}
              />
            )
          })}
        </Box>
      )}
    </Box>
  )
}

export default RageInputs
