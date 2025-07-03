import { Add, Article } from '@mui/icons-material'
import { Button } from '@mui/material'
import { DocumentTable } from './components'
import { BackdropLoading, useBoolean, useRuntimeSubmitActions, ValueListQuery } from '@/libV4'
import { useColumns, useQueryForList } from './hooks'
import { useState } from 'react'
import { useRelxcompQuery, useSaveItems } from '../../hooks'
import { useStoreActions } from 'easy-peasy'

const CommitmentSection = ({
  nit_compania,
  getValues,
  pushDataForm,
  newPptal,
  isPendingPushDataForm,
  formComponent,
}) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const [selectedCompromise, setSelectedCompromise] = useState([])
  const addModal = useBoolean()
  const columns = useColumns()

  const tipo_compptal = getValues('comprobantepptal_w.tipo_compptal')
  const nro_comprobantepptal = getValues('comprobantepptal_w.nro_comprobantepptal')
  const { deleteRecord, deletingRecord } = useRuntimeSubmitActions({ keyName: formComponent })
  const { isPendingQuery } = useRelxcompQuery({
    nit_compania,
    tipo_compptal,
    nro_comprobantepptal,
    setSelectedCompromise,
  })

  const query = useQueryForList({ nit_compania })

  const handleClick = (row) => {
    setSelectedCompromise((prev) => {
      const isSelected = prev.some((item) => item.nrodoc === row.nrodoc)
      if (isSelected) {
        return prev.filter((item) => item.nrodoc !== row.nrodoc)
      } else {
        return [...prev, { ...row, isNew: true }]
      }
    })
  }

  const { saveItems } = useSaveItems({ pushDataForm, nit_compania })

  const handleSave = async () => {
    await saveItems({
      items: selectedCompromise,
      setItems: setSelectedCompromise,
      blockId: 'relxcomp_w',
      mapData: (item) => ({
        tipo_relacionado: item.tipo_compptal,
        nro_relacionado: item.nro_comprobantepptal,
        tipo_compptal,
        nro_comprobantepptal,
      }),
      getId: (item) => item.nrodoc,
    })
  }

  const handleDeleteQuery = async (row) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Confirmar',
      content: '¿Está seguro de eliminar el registro?',
      onConfirm: () => {
        deleteRecord({
          body: {
            blockId: 'relxcomp_w',
            where: {
              id: row.id,
              tipo_relacionado: row.tipo_relacionado,
              nro_relacionado: row.nro_relacionado,
              tipo_compptal: row.tipo_compptal,
              nro_comprobantepptal: row.nro_comprobantepptal,
              nit_compania,
            },
          },
        })
      },
    })
  }

  return (
    <div className='p-3'>
      <BackdropLoading
        loading={isPendingQuery || isPendingPushDataForm || deletingRecord}
        sizeLoading={80}
      />
      <div className='grid grid-cols-12 backgroundwhite1 p-4 gap-4 rounded-md'>
        <div className='col-span-12 flex justify-end'>
          <Button
            variant='contained'
            onClick={addModal.handleShow}
            startIcon={<Add />}
            disabled={newPptal}
            sx={{
              minWidth: '200px',
            }}
          >
            Nuevo
          </Button>
        </div>
        <div className='col-span-12'>
          <DocumentTable
            rows={selectedCompromise}
            setSelectedCompromise={setSelectedCompromise}
            handleDeleteQuery={handleDeleteQuery}
          />
        </div>
        <div className='col-span-12 flex flex-row justify-end gap-4'>
          <Button
            variant='contained'
            sx={{
              minWidth: '200px',
            }}
          >
            Cargar rubros
          </Button>
          <Button
            variant='contained'
            endIcon={<Article />}
            sx={{
              minWidth: '200px',
            }}
          >
            Imprimir
          </Button>
          <Button
            variant='contained'
            onClick={handleSave}
            disabled={!selectedCompromise?.some((item) => item.isNew) || newPptal}
            sx={{
              minWidth: '200px',
            }}
          >
            Guardar
          </Button>
        </div>
      </div>
      {addModal.show && (
        <ValueListQuery
          show={addModal.show}
          handleShow={addModal.handleShow}
          handleShowConfirm={addModal.handleShow}
          selectedOption={handleClick}
          queryProps={{
            lovQuery: query,
          }}
          tableProps={{ columns }}
        />
      )}
    </div>
  )
}

export default CommitmentSection
