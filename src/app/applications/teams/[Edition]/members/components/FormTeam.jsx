import { useBoolean, usePrivileges, useSearch } from '@/lib'
import { GridRowModes, useGridApiRef } from '@mui/x-data-grid-premium'
import { useEffect, useState } from 'react'
import { useAssignUsersFunctions, useColumnsTeamMembers } from '../hooks'
import { AddCircle } from '@mui/icons-material'
import { Box } from '@mui/material'
import { MembersTable } from '.'
import { sxContainer } from '@/app/applications/styles'
import { ModalSearchUser } from '../modals'

const FormTeam = ({ teams, idEdition, refetchTeamsMember, fechingMembers }) => {
  const searchUser = useSearch()

  const refDatagrid = useGridApiRef()
  const modalUsers = useBoolean()
  const [idMember, setIdMember] = useState()
  const [rows, setRows] = useState([])
  const [addNew, setAddNew] = useState(false)
  const [rowModesModel, setRowModesModel] = useState({})
  const [rowParams, setRowParams] = useState()
  const [editedRow, setEditedRow] = useState([{}])

  const addAccess = usePrivileges('cgr.uri.crear_miembros_equipo')
  const editAccess = usePrivileges('cgr.uri.editar_miembros_equipo')

  const {
    createTeamMember,
    editTeamMember,
    isLoading: loadingRequests,
  } = useAssignUsersFunctions(
    idMember,
    refetchTeamsMember,
    editedRow,
    setRowModesModel,
    setAddNew,
    setRows
  )
  const addRow = async () => {
    const idNewJobTitle = crypto.randomUUID()
    await searchUser.clearSearch()
    await setRows([
      {
        id: idNewJobTitle,
        isNew: true,
      },
      ...rows,
    ])
    setAddNew(true)
    setRowModesModel({ ...rowModesModel, [idNewJobTitle]: { mode: GridRowModes.Edit } })
  }

  const buttons = addAccess
    ? [
        {
          title: 'Agregar',
          icon: <AddCircle />,
          onClick: addRow,
          disabled: addNew,
          privilege: 'cgr.uri.crear_miembros_equipo',
        },
      ]
    : []
  useEffect(() => {
    if (teams && teams?.data?.length !== 0) {
      setRows(teams?.data)
    }
  }, [teams, setRows])

  const selectAutocompleteValue = (props, newValue) => {
    const { id, field, value } = props
    if (newValue) {
      refDatagrid.current.setEditCellValue({ id, field, value: newValue || value })
      return
    }
    refDatagrid.current.setEditCellValue({ id, field, value: null })
  }
  const processRowUpdate = async (newRow) => {
    setEditedRow(newRow)
    if (newRow.isNew) {
      await createTeamMember({
        id_equipo_uri: idEdition,
        id_usuario: newRow?.user?.id,
        tipo: newRow?.type,
        activo: newRow?.activo ?? 'S',
      })
    } else {
      await editTeamMember({
        tipo: newRow?.type,
        activo: newRow?.activo,
      })
    }
    return newRow
  }
  const columns = useColumnsTeamMembers(
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
  )

  return (
    <Box sx={sxContainer}>
      <MembersTable
        isLoading={fechingMembers}
        dataMembers={{
          refDatagrid,
          rows,
          columns,
          rowModesModel,
          isLoadingTable: fechingMembers,
        }}
        searchUser={searchUser}
        buttons={buttons}
        processRowUpdate={processRowUpdate}
        loadingRequests={loadingRequests}
      />
      {modalUsers.show && (
        <ModalSearchUser
          modalUsers={modalUsers}
          rowParams={rowParams}
          refDatagrid={refDatagrid}
        />
      )}
    </Box>
  )
}

export default FormTeam
