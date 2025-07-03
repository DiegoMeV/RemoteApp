import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import {
  AutocompleteNoForm,
  BasicTitle,
  SelectDG,
  ValueListGlobal,
  useBoolean,
  useMutationDynamicBaseUrl,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { GridRowModes, useGridApiRef } from '@mui/x-data-grid-premium'
import GenericAccordion from '@/app/applications/contracts/[Edition]/components/Accordions/GenericAccordion'
import toast from 'react-hot-toast'

const ActualizacionesContrato = ({ form }) => {
  const idRegionSelected = form.watch('id_region_alertada')

  const apiRef = useGridApiRef()
  const [rowModesModel, setRowModesModel] = useState({})
  const [newRow, setNewRow] = useState()
  const [rowParams, setRowParams] = useState()
  const searchUsers = useSearch()
  const userModalLov = useBoolean()

  const onChangeUser = (apiRef, props, newValue) => {
    const { id, field } = props
    if (!newValue) {
      apiRef.current.setEditCellValue({
        id,
        field: 'name',
        value: null,
      })
      return
    }
    apiRef.current.setEditCellValue({ id, field, value: newValue })
    apiRef.current.setEditCellValue({
      id,
      field: 'tipo',
      value: newValue.tipo,
    })
  }
  const { data: infoRegion, isLoading: loadingInfoRegion } = useQueryDynamicApi({
    url: `/miembrosEquiposUri?idEquipoUri=${idRegionSelected}`,
    baseKey: 'urlCgr',
    isCompanyRequest: true,
    enabled: !!idRegionSelected,
  })

  const columns = [
    {
      field: 'name',
      headerName: 'Nombre',
      width: 300,
      editable: true,
      valueGetter: (params) => {
        return `${params?.row?.dataUser?.firstName ?? ''}  ${params?.row?.dataUser?.lastName ?? ''}`
      },
      renderEditCell: (params) => {
        return (
          <AutocompleteNoForm
            {...params}
            value={params?.row.id_usuario ?? params?.row?.name?.id_usuario ?? null}
            options={infoRegion?.data}
            onChange={(newValue) => onChangeUser(apiRef, params, newValue)}
            handleSearch={searchUsers.handleSearchText}
            isLoading={loadingInfoRegion}
            getOptionLabel={(option) =>
              `${option?.dataUser?.firstName ?? ''}  ${option?.dataUser?.lastName ?? ''}`
            }
            openModal={() => {
              userModalLov?.handleShow()
              setRowParams(params)
            }}
            idSearch={'id_usuario'}
          />
        )
      },
    },
    {
      field: 'tipo',
      headerName: 'Tipo',
      width: 170,
      editable: true,
      renderEditCell: (params) => {
        return (
          <>
            {(params.row.tipo === 'COORDINADOR' || params.row.tipo === 'LIDER') && (
              <Typography>{params.row.tipo}</Typography>
            )}
            {(params.row.tipo === 'AUXILIAR' || params.row.tipo === 'RESPONSABLE') && (
              <SelectDG
                {...params}
                options={[
                  { value: 'AUXILIAR', label: 'AUXILIAR' },
                  { value: 'RESPONSABLE', label: 'RESPONSABLE' },
                ]}
              />
            )}
          </>
        )
      },
    },
  ]

  const {
    data: teamInfo,
    isFetching: loadingTeam,
    isError: errorTeam,
    refetch: refetchTeam,
  } = useQueryDynamicApi({
    url: `/equipoRegistroAri?idRegistro=${form.watch('id_registro_ari')}&esBorrado=false`,
    baseKey: 'urlCgr',
    isCompanyRequest: true,
    enabled: !!idRegionSelected,
  })
  const { mutateAsync: addOfficer, isPending: loadingAdding } = useMutationDynamicBaseUrl({
    url: '/equipoRegistroAri',
    baseKey: 'urlCgr',
    isCompanyRequest: true,
    onSuccess: () => {
      refetchTeam()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'ha ocurrido un error')
    },
  })
  const updateInfo = (data) => {
    // control when the name is undefined
    if (data?.name === undefined) {
      setRowModesModel((prev) => {
        return { ...prev, [data.id]: { mode: GridRowModes.Edit } }
      })
    }
    // Create a new user in the teanm
    if (data?.isNew) {
      addOfficer({
        body: {
          id_usuario: data?.name.id_usuario,
          tipo: data?.tipo,
          id_registro_ari: form.watch('id_registro_ari'),
        },
      })
      setNewRow(false)
      return
    }
    // Update the user in the team
    addOfficer({
      methodBody: 'PUT',
      qry: `/${data.id}`,
      body: {
        id_usuario: data?.name.id_usuario,
        tipo: data?.tipo,
      },
    })
  }
  const delItem = (id) => {
    addOfficer({
      methodBody: 'PUT',
      qry: `/${id}`,
      body: {
        esBorrado: true,
      },
    })
  }

  return (
    <>
      <BasicTitle title='Creación equipo' />
      <Box style={{ height: 400, width: '100%' }}>
        <GenericAccordion
          apiRefDatagrid={apiRef}
          labelButton='Agregar miembro'
          columns={columns}
          infoRows={teamInfo?.data ?? []}
          updateInfo={updateInfo}
          loadingInfo={loadingTeam || loadingAdding}
          isError={errorTeam}
          rowModesModel={rowModesModel}
          setRowModesModel={setRowModesModel}
          newRow={newRow}
          setNewRow={setNewRow}
          noAccordion={true}
          delItem={delItem}
          sx={{
            '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer': {
              display: 'none',
            },
          }}
        />
        <ValueListGlobal
          title='Usuarios de la región'
          openOptions={userModalLov}
          columns={[
            {
              field: 'name',
              headerName: 'Nombre',
              width: 300,
              valueGetter: (params) =>
                `${params.row?.dataUser?.firstName ?? ''}  ${params.row?.dataUser?.lastName ?? ''}`,
            },
          ]}
          rows={infoRegion?.data ?? []}
          loading={loadingInfoRegion}
          searchOptions={searchUsers}
          selectedOption={(params) => {
            onChangeUser(apiRef, rowParams, params.row)
          }}
        />
      </Box>
    </>
  )
}

export default ActualizacionesContrato
