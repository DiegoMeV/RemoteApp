import { useState } from 'react'
import PacHeader from './PacHeader'
import PacTable from './PacTable'
import PacFooter from './PacFooter'
import { useMovPresupuestalPac } from './hooks'
import { useSaveItems } from '../../../../hooks'
import { BackdropLoading, useOracleExecutes, useRuntimeSubmitActions } from '@/libV4'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

const Pac = ({ row, nit_compania, pushDataForm, formComponent }) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const [pacs, setPacs] = useState([])

  useMovPresupuestalPac({
    nit_compania,
    tipo_compptal: row.tipo_compptal,
    nro_comprobantepptal: row.nro_comprobantepptal,
    rubro_id: row.rubro_id,
    nromovpptal: row.nromovpptal,
    setPacs,
  })

  const { getQueryResult } = useOracleExecutes()

  const total = pacs.reduce((acc, curr) => acc + (Number(curr.valor) || 0), 0)

  const handleClick = () => {
    setPacs((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        mes: '',
        valor: 0,
        isNew: true,
      },
    ])
  }

  const { deleteRecord, deletingRecord } = useRuntimeSubmitActions({ keyName: formComponent })

  const handleDeleteQuery = async (pac) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Confirmar',
      content: '¿Está seguro de eliminar el registro?',
      onConfirm: async () => {
        try {
          deleteRecord({
            body: {
              blockId: 'pacxcomp_w',
              where: {
                mes: pac.mes,
                nit_compania,
              },
            },
          })
          setPacs((prev) => prev.filter((item) => item.id !== pac.id))
        } catch (error) {
          toast.error('Error al eliminar el registro')
          console.error('Error deleting record:', error)
        }
      },
    })
  }

  const handleRemovePac = (pac) => {
    if (!pac.isNew) {
      handleDeleteQuery(pac)
      return
    }
    setPacs((prev) => prev.filter((item) => item.id !== pac.id))
  }

  const handleChangeValue = (id, newValue) => {
    setPacs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, valor: Number(newValue) } : item))
    )
  }

  const handleChangeMes = (id, newMes) => {
    setPacs((prev) => prev.map((item) => (item.id === id ? { ...item, mes: newMes } : item)))
  }

  const getNroMovPac = async () => {
    const query = `SELECT pkg_consecutivos_ppto.seq_nromovpacw('${nit_compania}') nromovpac FROM dual`
    const result = await getQueryResult(query)
    return result?.data?.[0]?.nromovpac
  }

  const { saveItems } = useSaveItems({ pushDataForm, nit_compania })

  const handleSave = async () => {
    await saveItems({
      items: pacs,
      setItems: setPacs,
      blockId: 'pacxcomp_w',
      mapData: async (item) => {
        const nromovpac = await getNroMovPac()
        return {
          ano: row.ano,
          tipo_compptal: row.tipo_compptal,
          nro_comprobantepptal: row.nro_comprobantepptal,
          tipo_ppto: row.tipo_ppto,
          rubro_id: row.rubro_id,
          nromovpptal: row.nromovpptal,
          nromovpac,
          recurso: row.recurso,
          id_centrocosto: row.id_centrocosto,
          proyecto: row.proyecto,
          tercero_bd: 0,
          tercero_type_bd: 'ENTIDADES',
          fuente_id: row.fuente_id,
          valor: +item.valor,
          mes: item.mes,
          cpc: row.cpc,
          cpi: row.cpi,
        }
      },
      getId: (item) => item.id,
    })
  }

  return (
    <section className='space-y-4'>
      <BackdropLoading
        loading={deletingRecord}
        sizeLoading={80}
      />
      <PacHeader onClick={handleClick} />
      <PacTable
        pacs={pacs}
        onValueChange={handleChangeValue}
        onMesChange={handleChangeMes}
        onRemove={handleRemovePac}
      />
      <PacFooter
        total={total}
        onSave={handleSave}
      />
    </section>
  )
}

export default Pac
