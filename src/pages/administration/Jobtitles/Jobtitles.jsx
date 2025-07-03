import { BasicTitle, DataGridCustom, DrawerEdition, useBoolean } from '@/libV4'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jobtitlesColumns } from './funcs'
import { AddCircle } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { JobtitleEdition } from './components'

const Jobtitles = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [rowSelected, setRowSelected] = useState()

  const openEdition = useBoolean({
    confirmModalProps: {
      icon: 'warning',
      title: '¿Estás seguro de cancelar la edición de este cargo?',
    },
  })

  const handleOpenEdition = (data) => {
    openEdition?.handleShow()
    setRowSelected(data)
  }

  const handleEditRoles = (data) => {
    if (data?.id) {
      navigate(`${data.id}`)
    }
  }

  const columns = jobtitlesColumns(handleOpenEdition, handleEditRoles)

  return (
    <>
      <BasicTitle title='Administración de Cargos' />
      <div className='backgroundGray1'>
        <DataGridCustom
          requestProps={{
            baseKey: 'urlUsers',
            url: `/jobTitles`,
          }}
          tableProps={{
            columns,
            divClassName: 'col-span-12 h-[calc(100vh-270px)]',
          }}
          toolbarProps={{
            buttonProps: {
              variant: 'contained',
              startIcon: <AddCircle />,
              onClick: () => handleOpenEdition(null),
            },
          }}
        />
      </div>
      {openEdition.show && (
        <DrawerEdition
          open={openEdition.show}
          onClose={() => openEdition.handleShowConfirm()}
          width={600}
          title={
            <Typography
              color='primary'
              variant='h5'
            >
              {rowSelected ? `Edición de cargo - ${rowSelected?.name ?? ''}` : 'Creación de cargo'}
            </Typography>
          }
        >
          <JobtitleEdition
            idJobtitle={rowSelected?.id ?? null}
            onSuccessFunction={() => {
              queryClient.invalidateQueries([`/jobTitles`])
              openEdition.handleShow()
            }}
          />
        </DrawerEdition>
      )}
    </>
  )
}

export default Jobtitles
