import { BasicTitle, GenericMoney, useBoolean } from '@/lib'
import { Add } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { columnsDetailObligPre, moneyFields } from './funcs'
import { Fragment, useState } from 'react'
import {
  BackdropLoading,
  BasicTable,
  MagicString,
  useRuntimeSubmitActions,
  ValueListQuery,
} from '@/libV4'
import { ModalBlocks } from '../ModalBlocks'
import { ModalBlockDetails, ModalChangeValue } from './components'
import dayjs from 'dayjs'
import { useMovPresupuestal, useSaveItems } from '../../hooks'
import { useQueryForList } from './hooks'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

const DetailSection = ({
  pushDataForm,
  nit_compania,
  compptalType,
  getValues,
  dataComprobantepptal_w,
  newPptal,
  isPendingPushDataForm,
  formComponent,
}) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const [selectedRubro, setSelectedRubro] = useState([])
  const [selectedRowRubro, setSelectedRowRubro] = useState({})

  const movModal = useBoolean()
  const addModal = useBoolean()
  const editModal = useBoolean()
  const detailModal = useBoolean()

  const tipo_compptal = getValues('comprobantepptal_w.tipo_compptal')
  const nro_comprobantepptal = getValues('comprobantepptal_w.nro_comprobantepptal')

  const handleDetailClick = (row) => {
    setSelectedRowRubro(row)
    detailModal.handleShow()
  }

  const handleRowClick = (row) => {
    setSelectedRowRubro(row)
    editModal.handleShow()
  }

  const { isPendingQuery } = useMovPresupuestal({
    nit_compania,
    dataComprobantepptal_w,
    nro_comprobantepptal,
    setSelectedRubro,
  })

  const handleClick = (row) => {
    setSelectedRubro((prev) => {
      const isSelected = prev.some((item) => item.rubro_id === row.rubro_id)
      if (isSelected) {
        return prev.filter((item) => item.rubro_id !== row.rubro_id)
      } else {
        return [...prev, { ...row, isNew: true }]
      }
    })
  }

  const { deleteRecord, deletingRecord } = useRuntimeSubmitActions({ keyName: formComponent })

  const handleDeleteQuery = async (rubro) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Confirmar',
      content: '¿Está seguro de eliminar el registro?',
      onConfirm: async () => {
        try {
          await deleteRecord({
            body: {
              blockId: 'movpresupuestal_w',
              where: {
                rubro_id: rubro.rubro_id,
                fuente_id: rubro.fuente_id,
                nit_compania,
              },
            },
          })
          setSelectedRubro((prev) => prev.filter((item) => item.rubro_id !== rubro.rubro_id))
        } catch (error) {
          toast.error('Error al eliminar el registro')
          console.error('Error deleting record:', error)
        }
      },
    })
  }

  const handleRemoveRubro = async (rubro) => {
    if (!rubro.isNew) {
      handleDeleteQuery(rubro)
      return
    }
    setSelectedRubro((prev) => prev.filter((item) => item.rubro_id !== rubro.rubro_id))
  }

  const columns = columnsDetailObligPre({ handleRowClick, handleDetailClick, handleRemoveRubro })
  const vlColumns = columnsDetailObligPre({ readOnly: true })

  const { saveItems } = useSaveItems({ pushDataForm, nit_compania })

  const handleSave = async () => {
    await saveItems({
      items: selectedRubro,
      setItems: setSelectedRubro,
      blockId: 'movpresupuestal_w',
      mapData: (item) => ({
        valor: +item.valor,
        fecha: dayjs(item.fecha).format(MagicString.DATE_FORMAT.ORACLE_FORMAT),
        tipo_ppto: item.tipo_ppto,
        rubro_id: item.rubro_id,
        recurso: item.recurso,
        cpc: item.cpc,
        cpi: item.cpi,
        fuente_id: item.fuente_id,
        tercero_bd: 0,
        proyecto: item.proyecto,
        ano: item.ano,
        id_centrocosto: item.id_centrocosto,
        tipo_compptal,
        nro_comprobantepptal,
      }),
      getId: (item) => item.rubro_id,
    })
  }
  const query = useQueryForList({
    nit_compania,
    nro_comprobantepptal,
    compptalType,
  })

  return (
    <>
      <section className='p-2'>
        <div className='grid grid-cols-12 backgroundwhite1 gap-4 rounded-md'>
          <BackdropLoading
            loading={isPendingQuery || isPendingPushDataForm || deletingRecord}
            sizeLoading={80}
          />
          <BasicTitle
            className='col-span-12'
            title='Detalles del comprobante'
          />
          <div className='col-span-12 flex justify-end px-4'>
            <Button
              variant='contained'
              onClick={addModal.handleShow}
              disabled={newPptal}
              startIcon={<Add />}
              sx={{
                minWidth: '200px',
              }}
            >
              Nuevo
            </Button>
          </div>
          <div className='col-span-12'>
            <div className='p-2'>
              <BasicTable
                rows={selectedRubro ?? []}
                columns={columns}
                containerProps={{
                  className: 'h-[calc(100vh-400px)] backgroundwhite1',
                }}
              />
            </div>
          </div>

          <div className='col-span-12 flex items-center py-2 justify-center space-x-4'>
            {moneyFields?.map((field, index) => (
              <Fragment key={index}>
                <Typography
                  variant='body1'
                  fontWeight='bold'
                >
                  {field?.label ?? ''}
                </Typography>
                <GenericMoney
                  value={field?.value ?? 0}
                  variant='standard'
                  InputProps={{
                    style: {
                      textAlign: 'right',
                    },
                  }}
                  sx={{
                    width: '140px',
                  }}
                />
              </Fragment>
            ))}
          </div>
          <div className='col-span-12 flex flex-row justify-end gap-4 p-4'>
            <Button
              variant='contained'
              onClick={handleSave}
              disabled={!selectedRubro?.some((item) => item.isNew) || newPptal}
              sx={{
                minWidth: '200px',
              }}
            >
              Guardar
            </Button>
          </div>
        </div>
      </section>
      {addModal?.show && (
        <ValueListQuery
          show={addModal.show}
          handleShow={addModal.handleShow}
          handleShowConfirm={addModal.handleShow}
          selectedOption={handleClick}
          queryProps={{
            lovQuery: query,
          }}
          tableProps={{ columns: vlColumns }}
        />
      )}
      {editModal?.show && (
        <ModalChangeValue
          editModal={editModal}
          setSelectedRubro={setSelectedRubro}
          row={selectedRowRubro}
          nit_compania={nit_compania}
        />
      )}
      {movModal.show && (
        <ModalBlocks
          open={movModal.show}
          handleClose={movModal.handleShow}
        />
      )}
      {detailModal.show && (
        <ModalBlockDetails
          open={detailModal.show}
          handleClose={detailModal.handleShow}
          row={selectedRowRubro}
          nit_compania={nit_compania}
          pushDataForm={pushDataForm}
          formComponent={formComponent}
        />
      )}
    </>
  )
}

export default DetailSection
