import { useState } from 'react'
import { Box, Button, Checkbox, Typography, Paper, Grid } from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { AutocompleteValueList, ClassicIconButton, useBoolean, useGetUsers, useSearch } from '@/lib'
import toast from 'react-hot-toast'

const MappingUsers = ({ form }) => {
  const [rows, setRows] = useState([{ id: crypto.randomUUID(), copy: false }])
  const lovControl = useBoolean()
  const searchOfficer = useSearch()
  const { data: allUsers, isLoading } = useGetUsers({
    qry: searchOfficer?.searchText
      ? `?isActive=true&qrySearch=${searchOfficer?.searchText}`
      : '?isActive=true',
  })

  const handleAddRow = () => {
    setRows([...rows, { id: crypto.randomUUID(), copy: false }])
  }

  const handleDeleteRow = (id) => {
    if (rows.length > 1) {
      form.unregister(`officer.${id}`)
      setRows(rows.filter((row) => row.id !== id))
    } else {
      toast.error('Debe haber al menos una fila.')
    }
  }

  const handleCopyChange = (id) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, copy: !row.copy } : row)))
    form.setValue(`officer.${id}.copy`, !form.getValues(`officer.${id}.copy`))
  }

  return (
    <Box
      p={3}
      display={'flex'}
      flexDirection={'column'}
      minHeight={'55vh'}
      maxHeight={'55vh'}
      overflow={'auto'}
    >
      <Button
        variant='contained'
        startIcon={<Add />}
        onClick={handleAddRow}
        sx={{ mb: 2 }}
      >
        Agregar
      </Button>

      {rows.map((row) => (
        <Paper
          key={row.id}
          sx={{ mb: 1, p: 2 }}
        >
          <Grid
            container
            spacing={2}
            alignItems='center'
          >
            <AutocompleteValueList
              controlModal={lovControl}
              control={form.control}
              name={`DESTINATARIO.[${row.id}]`}
              md={10}
              label='Funcionario'
              options={allUsers}
              loading={isLoading}
              searchText={searchOfficer}
              setValue={form.setValue}
              columns={[{ field: 'name', headerName: 'Nombre' }]}
              getLabel={(option) => `${option.firstName ?? null} ${option.lastName ?? null} `}
            />
            <Grid
              item
              md={1}
              display={'flex'}
              alignItems={'center'}
            >
              <Checkbox
                checked={row.copy}
                onChange={() => handleCopyChange(row.id)}
              />
              <Typography variant='body2'>Copia</Typography>
            </Grid>
            <Grid
              item
              md={1}
            >
              <ClassicIconButton
                onClick={() => handleDeleteRow(row.id)}
                title='Borrar fila'
                placement='bottom'
                color='secondary'
                hoverColor='red'
              >
                <Delete sx={{ fontSize: 35 }} />
              </ClassicIconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  )
}

export default MappingUsers
