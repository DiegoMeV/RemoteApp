import GenericAccordion from '@/app/applications/contracts/[Edition]/components/Accordions/GenericAccordion'
import { GridRowModes, useGridApiRef } from '@mui/x-data-grid-premium'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AutocompleteNoForm, useBoolean, useGetUsers, useSearch, ValueListGlobal } from '@/lib'
import { Switch } from '@mui/material'
import { useApisActors } from '../../components'

const ViewStep2 = ({ form, idProcess }) => {
  const apiRef = useGridApiRef()
  const [rowModesModel, setRowModesModel] = useState({})
  const [newRow, setNewRow] = useState(false)
  const [actorsInfo, setActorsInfo] = useState([])
  const [rowParams, setRowParams] = useState()
  const [rowSelected, setRowSelected] = useState({})
  const searchOfficer = useSearch()
  const lovControl = useBoolean()
  const { data: allUsers, isLoading: loadingUsers } = useGetUsers({
    qry: searchOfficer?.searchText
      ? `?isActive=true&querySearch=${searchOfficer?.searchText}`
      : '?isActive=true',
  })
  useEffect(() => {
    form.setValue('DESTINATARIO', actorsInfo)
  }, [actorsInfo, form])

  const { getProcessActor, createActor, deleteActor, loadingActors, loadingHandlerActor } =
    useApisActors({
      idProcess,
      setActorsInfo,
      form,
      typeActor: 'DESTINATARIO',
      setNewRow,
      rowSelected,
      setRowModesModel,
      rowModesModel,
    })
  useEffect(() => {
    getProcessActor({
      qry: '&actorTypeKey=DESTINATARIO',
    })
  }, [getProcessActor])
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
    apiRef.current.setEditCellValue({ id, field, value: newValue.id })
  }
  const columns = [
    {
      field: 'idUser',
      headerName: 'Nombre del funcionario',
      flex: 1,
      editable: true,
      renderCell: (params) => {
        return `${params?.row?.userActorData?.firstName ?? ''}  ${
          params?.row?.userActorData?.lastName ?? ''
        }`
      },
      renderEditCell: (params) => {
        return (
          <AutocompleteNoForm
            {...params}
            options={allUsers?.data}
            onChange={(newValue) => onChangeUser(apiRef, params, newValue)}
            handleSearch={searchOfficer.handleSearchText}
            isLoading={loadingUsers}
            getOptionLabel={(option) => `${option?.firstName ?? ''}  ${option?.lastName ?? ''}`}
            openModal={() => {
              lovControl?.handleShow()
              setRowParams(params)
            }}
          />
        )
      },
    },
    {
      field: 'copy',
      headerName: 'Copia',
      width: 100,
      editable: true,
      renderCell: (params) => {
        return params?.row?.actorData?.additionalData?.copy ? 'Si' : 'No'
      },
      renderEditCell: (params) => {
        return (
          <Switch
            checked={params.value ?? false}
            onChange={(e) => {
              apiRef.current.setEditCellValue({
                id: params.id,
                field: 'copy',
                value: e.target.checked,
              })
            }}
          />
        )
      },
    },
  ]
  const delItem = (id) => {
    deleteActor({ qry: `/${id}` })
  }
  const updateInfo = (data) => {
    setRowSelected(data.id)
    // control when the name is undefined
    searchOfficer.clearSearch()
    if (data?.idUser === undefined) {
      setRowModesModel((prev) => {
        return { ...prev, [data.id]: { mode: GridRowModes.Edit } }
      })
      toast.error('Debe seleccionar un usuario')
      apiRef.current.startRowEditMode({ id: data.id })
      return
    }
    // Create a new user to sent
    const newRow = { ...data }
    delete newRow.isNew
    delete newRow.id

    if (data?.isNew) {
      const bodyActor = {
        actorTypeKey: 'DESTINATARIO',
        idUserActor: newRow.idUser,
        ...(newRow.copy !== undefined && {
          actorData: {
            additionalData: { copy: newRow.copy },
          },
        }),
      }
      createActor({ qry: `/${idProcess}/actors`, body: bodyActor })
      return
    }
  }
  return (
    <>
      <GenericAccordion
        apiRefDatagrid={apiRef}
        labelButton='Agregar Destinatario'
        columns={columns}
        infoRows={actorsInfo ?? []}
        updateInfo={updateInfo}
        loadingInfo={loadingActors || loadingHandlerActor}
        rowModesModel={rowModesModel}
        setRowModesModel={setRowModesModel}
        newRow={newRow}
        setNewRow={setNewRow}
        noAccordion={true}
        delItem={delItem}
        editable={false}
        sx={{
          '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer': {
            display: 'none',
          },
        }}
      />
      <ValueListGlobal
        title='Usuarios de la región'
        openOptions={lovControl}
        columns={[
          {
            field: 'name',
            headerName: 'Nombre',
            width: 300,
            valueGetter: (params) => {
              return `${params.row?.firstName ?? ''}  ${params.row?.lastName ?? ''}`
            },
          },
        ]}
        rows={allUsers?.data ?? []}
        loading={loadingUsers}
        searchOptions={searchOfficer}
        selectedOption={(params) => {
          onChangeUser(apiRef, rowParams, params.row)
        }}
      />
    </>
  )
}

export default ViewStep2
