import { Grid, TextField } from '@mui/material'

const BasicDataNewProcess = ({ infoProcess, setBasicDataProcess, basicDataProcess, errorInfo }) => {
  const handleChange = (event, name, id) => {
    setBasicDataProcess((prevValues) =>
      prevValues?.map((value) =>
        value.name === name ? { ...value, value: event.target.value, id: id } : value
      )
    )
  }

  return (
    <Grid
      container
      spacing={2}
    >
      {infoProcess.processSelected.typeSpecs?.additionalData.map((data, index) => (
        <Grid
          item
          xs={12}
          sm={data.type === 'textarea' ? 12 : 6}
          key={index}
        >
          <TextField
            fullWidth
            label={data.name}
            value={
              basicDataProcess
                ? basicDataProcess.find((field) => field.name === data.name)?.value || ''
                : ''
            }
            required={data.isRequired}
            type={data.type === 'textarea' ? 'text' : data.type}
            multiline={data.type === 'textarea'}
            rows={data.type === 'textarea' ? 5 : 1}
            onChange={(event) => handleChange(event, data.name, data.id)}
            InputLabelProps={data.type === 'date' ? { shrink: true } : {}}
            error={
              errorInfo &&
              data.isRequired &&
              !basicDataProcess.find((field) => field.name === data.name)?.value
            }
            helperText={
              errorInfo &&
              data.isRequired &&
              !basicDataProcess.find((field) => field.name === data.name)?.value
                ? 'Campo requerido'
                : ''
            }
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default BasicDataNewProcess
