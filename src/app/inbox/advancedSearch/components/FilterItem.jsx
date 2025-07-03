import { ChooseInput, usePrivileges } from '@/lib'
import { filtersPresupuestal, filtersProcessPayment, optionsFilter, selects } from '../constants'
import { Box, Grid, ListSubheader, MenuItem, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { updateState } from '../funcs'

const FilterItem = ({ filter, control, setValue }) => {
  const [filterName, setFilterName] = useState('')
  const select = selects[filterName]

  const filtersProcessPaymentPrivilege = usePrivileges(
    'procesos.busqueda_avanzada.filtros_modulo_pagos'
  )

  const filtersPresupuestalPrivilege = usePrivileges(
    'procesos.busqueda_avanzada.filtros_modulo_presupuesto'
  )

  useEffect(() => {
    updateState(filterName, setValue, filter, select)
  }, [filter, filter.id, filterName, select, setValue])

  return (
    <>
      <Grid
        item
        xs={12}
        md={5.5}
      >
        <Controller
          name={`${filter?.id ?? ''}.filter`}
          control={control}
          defaultValue={optionsFilter?.options?.[0]?.value}
          render={({ field }) => (
            <TextField
              {...field}
              select
              size='small'
              label='Filtrar por'
              fullWidth
              sx={{ bgcolor: 'backgroundWhite1' }}
            >
              <ListSubheader>Generales</ListSubheader>
              {optionsFilter.options.map((option) => (
                <Box
                  component={MenuItem}
                  key={option.value}
                  value={option.value}
                  onClick={() => {
                    setFilterName(option.value)
                  }}
                  pl={4}
                >
                  {option.label}
                </Box>
              ))}
              {filtersProcessPaymentPrivilege && <ListSubheader>Procesos de pago</ListSubheader>}
              {filtersProcessPaymentPrivilege &&
                filtersProcessPayment.map((option) => (
                  <Box
                    component={MenuItem}
                    key={option.value}
                    value={option.value}
                    onClick={() => {
                      setFilterName(option.value)
                    }}
                    pl={4}
                  >
                    {option.label}
                  </Box>
                ))}
              {filtersPresupuestalPrivilege && (
                <ListSubheader>Procesos de documentos presupuestales</ListSubheader>
              )}
              {filtersPresupuestalPrivilege &&
                filtersPresupuestal.map((option) => (
                  <Box
                    component={MenuItem}
                    key={option.value}
                    value={option.value}
                    onClick={() => {
                      setFilterName(option.value)
                    }}
                    pl={4}
                  >
                    {option.label}
                  </Box>
                ))}
              )
            </TextField>
          )}
        />
      </Grid>
      <ChooseInput
        control={control}
        item={{
          name: `${filter?.id ?? ''}.name`,
          label: 'Criterio',
          space: 5.5,
          type: select ? 'select' : 'text',
          options: select,
          validate: () => {
            return true
          },
        }}
      />
    </>
  )
}

export default FilterItem
