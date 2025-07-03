import { Autocomplete, Box, TextField, Typography } from '@mui/material'
import { AutocompleteNoForm, useAllUserInfo, usePrivileges, useSearch } from '@/lib'
import { OptionsTableMember } from '../components'
import { useBuildQueryUsers } from './useQryBuilder'
import { CustomSwitchEditingDG, GenericChip } from '@/app/applications/components'

const useColumnsTeamMembers = (
  rowModesModel,
  setRowModesModel,
  setRows,
  modalUsers,
  setRowParams,
  setAddNew,
  selectAutocompleteValue,
  setIdMember,
  addNew,
  editAccess
) => {
  const searchUser = useSearch()
  const hasPrivilegeEdit = usePrivileges('cgr.uri.editar_miembros_equipo')
  const qry = useBuildQueryUsers({ querySearch: searchUser?.searchText, pageSize: 10 })
  const { data: users, isLoading: loadingUsers } = useAllUserInfo({
    qry: qry,
    enabled: searchUser?.searchText?.length > 1,
  })
  const typeOptions = [
    {
      name: 'type',
      space: 4,
      type: 'select',
      options: [
        {
          label: 'Lider',
          value: 'LIDER',
        },
        {
          label: 'Coordinador',
          value: 'COORDINADOR',
        },
        {
          label: 'Auxiliar',
          value: 'AUXILIAR',
        },
      ],
    },
  ]
  const columns = [
    {
      field: 'user',
      headerName: 'Usuario',
      width: 250,
      editable: true,
      valueGetter: (params) => {
        return `${params?.row?.dataUser?.firstName ?? ''} ${params?.row?.dataUser?.lastName ?? ''}`
      },
      renderEditCell: (params) => {
        return addNew ? (
          <AutocompleteNoForm
            value={params.value}
            options={users?.data}
            handleSearch={searchUser?.handleSearchText}
            isLoading={loadingUsers}
            size='medium'
            placeholder='Buscar usuario'
            openModal={() => {
              modalUsers.handleShow()
              setRowParams(params)
            }}
            onChange={(newValue) => {
              selectAutocompleteValue(params, newValue)
            }}
            getOptionLabel={(option) => {
              return `${option.firstName ?? ''} ${option.lastName ?? ''}`
            }}
          />
        ) : (
          <Typography
            variant='body2'
            ml={2}
          >
            {`${params?.row?.dataUser?.firstName ?? ''} ${params?.row?.dataUser?.lastName ?? ''}`}
          </Typography>
        )
      },
    },
    {
      field: 'type',
      headerName: 'Tipo',
      width: 250,
      editable: true,
      valueGetter: (params) => {
        return `${params?.row?.tipo ?? ''}`
      },
      renderEditCell: (params) => {
        return (
          <Box width='100%'>
            <Autocomplete
              options={typeOptions[0].options}
              getOptionLabel={(option) => option?.label}
              value={typeOptions[0].options.find((option) => option?.value === params?.row?.tipo)}
              onChange={(event, newValue) => {
                selectAutocompleteValue(params, newValue?.value)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        )
      },
    },
    {
      field: 'activo',
      headerName: 'Estado',
      minWidth: 300,
      editable: true,
      renderEditCell: (params) => <CustomSwitchEditingDG {...params} />,
      renderCell: (params) => {
        return <GenericChip params={params} />
      },
    },
  ]
  if (hasPrivilegeEdit) {
    columns.push({
      field: 'options',
      headerName: '',
      width: 90,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      cellClassName: 'actions',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <OptionsTableMember
            rowModesModel={rowModesModel}
            setRowModesModel={setRowModesModel}
            rowParams={params.row}
            setRows={setRows}
            setNewRow={setAddNew}
            setIdMember={setIdMember}
            editAccess={editAccess}
          />
        )
      },
      hideable: false,
      filterable: false,
    })
  }
  return columns
}

export default useColumnsTeamMembers
