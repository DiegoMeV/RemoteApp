import { useState } from 'react'
import {
  BackdropLoading,
  MagicString,
  useBoolean,
  useRuntimeSubmitActions,
  ValueListQuery,
} from '@/libV4'
import CpcHeader from './CpcHeader'
import CpcTable from './CpcTable'
import CpcFooter from './CpcFooter'
import dayjs from 'dayjs'
import { useMovPresupuestalCpc, useQueryForList } from './hooks'
import { columns } from './const'
import { useSaveItems } from '../../../../hooks'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

const Cpc = ({ row, nit_compania, pushDataForm, formComponent }) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const [cpcs, setCpcs] = useState([])
  const cpcModal = useBoolean()

  useMovPresupuestalCpc({
    nit_compania,
    tipo_compptal: row.tipo_compptal,
    nro_comprobantepptal: row.nro_comprobantepptal,
    rubro_id: row.rubro_id,
    nromovpptal: row.nromovpptal,
    setCpcs,
  })

  const total = cpcs.reduce((acc, curr) => acc + (Number(curr.valor) || 0), 0)

  const handleClick = (row) => {
    setCpcs((prev) => {
      const isSelected = prev.some((item) => item.id === row.id)
      return isSelected
        ? prev.filter((item) => item.id !== row.id)
        : [...prev, { ...row, isNew: true }]
    })
  }

  const { deleteRecord, deletingRecord } = useRuntimeSubmitActions({ keyName: formComponent })

  const handleDeleteQuery = async (row) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Confirmar',
      content: '¿Está seguro de eliminar el registro?',
      onConfirm: async () => {
        try {
          deleteRecord({
            body: {
              blockId: 'movpresupuestal_wc',
              where: {
                cpcd: row.id,
                nromovpptalcpc: row.codigo,
                nit_compania,
              },
            },
          })
          setCpcs((prev) => prev.filter((item) => item.id !== row.id))
        } catch (error) {
          toast.error('Error al eliminar el registro')
          console.error('Error deleting record:', error)
        }
      },
    })
  }

  const handleRemoveCpc = async (cpc) => {
    if (!cpc.isNew) {
      handleDeleteQuery(cpc)
      return
    }
    setCpcs((prev) => prev.filter((item) => item.id !== cpc.id))
  }

  const handleChangeValue = (id, newValue) => {
    setCpcs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, valor: Number(newValue) } : item))
    )
  }

  const { saveItems } = useSaveItems({ pushDataForm, nit_compania })

  const handleSave = async () => {
    await saveItems({
      items: cpcs,
      setItems: setCpcs,
      blockId: 'movpresupuestal_wc',
      mapData: (item) => ({
        valor: +item.valor,
        nromovpptalcpc: +item.codigo,
        fecha: dayjs(row.fecha).format(MagicString.DATE_FORMAT.ORACLE_FORMAT),
        tipo_ppto: row.tipo_ppto,
        rubro_id: row.rubro_id,
        recurso: row.recurso,
        tipo_compptal: row.tipo_compptal,
        nro_comprobantepptal: row.nro_comprobantepptal,
        proyecto: row.proyecto,
        tercero_bd: 0,
        tercero_type_bd: 'ENTIDADES',
        fuente_id: row.fuente_id,
        nromovpptal: row.nromovpptal,
        id_centrocosto: row.id_centrocosto,
        ano: row.ano,
        cpc: row.cpc,
        cpi: row.cpi,
        cpcd: item.id,
      }),
      getId: (item) => item.codigo,
    })
  }
  const query = useQueryForList({ nit_compania, ano: row.ano })

  return (
    <section className='space-y-4'>
      <BackdropLoading
        loading={deletingRecord}
        sizeLoading={80}
      />
      <CpcHeader onClick={cpcModal.handleShow} />
      <CpcTable
        cpcs={cpcs}
        onValueChange={handleChangeValue}
        onRemove={handleRemoveCpc}
      />
      <CpcFooter
        total={total}
        onSave={handleSave}
      />
      {cpcModal.show && (
        <ValueListQuery
          show={cpcModal.show}
          handleShow={cpcModal.handleShow}
          handleShowConfirm={cpcModal.handleShow}
          selectedOption={handleClick}
          queryProps={{ lovQuery: query }}
          tableProps={{ columns }}
        />
      )}
    </section>
  )
}

export default Cpc
