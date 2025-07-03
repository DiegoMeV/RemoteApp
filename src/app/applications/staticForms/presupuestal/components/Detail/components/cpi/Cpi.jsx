import { useState } from 'react'
import {
  BackdropLoading,
  MagicString,
  useBoolean,
  useRuntimeSubmitActions,
  ValueListQuery,
} from '@/libV4'
import CpcHeader from './CpiHeader'
import CpcTable from './CpiTable'
import CpcFooter from './CpiFooter'
import dayjs from 'dayjs'
import { columns } from './const'
import { useMovPresupuestalCpi, useQueryForList } from './hooks'
import { useSaveItems } from '../../../../hooks'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

const Cpi = ({ row, nit_compania, pushDataForm, formComponent }) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const [cpis, setCpis] = useState([])
  const cpiModal = useBoolean()

  useMovPresupuestalCpi({
    nit_compania,
    tipo_compptal: row.tipo_compptal,
    nro_comprobantepptal: row.nro_comprobantepptal,
    rubro_id: row.rubro_id,
    fecha: row.fecha,
    nromovpptal: row.nromovpptal,
    setCpis,
  })

  const total = cpis.reduce((acc, curr) => acc + (Number(curr.valor) || 0), 0)

  const handleClick = (row) => {
    setCpis((prev) => {
      const key = `${row.codigo_act}_${row.codigo_ins}`
      const isSelected = prev.some((item) => `${item.codigo_act}_${item.codigo_ins}` === key)
      return isSelected
        ? prev.filter((item) => `${item.codigo_act}_${item.codigo_ins}` !== key)
        : [...prev, { ...row, isNew: true }]
    })
  }

  const { deleteRecord, deletingRecord } = useRuntimeSubmitActions({ keyName: formComponent })

  const handleDeleteQuery = async (cpi) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Confirmar',
      content: '¿Está seguro de eliminar el registro?',
      onConfirm: async () => {
        try {
          deleteRecord({
            body: {
              blockId: 'movpresupuestal_wp',
              where: {
                actividad: cpi.actividad,
                insumo: cpi.insumo,
                programa: cpi.programa,
                subprograma: cpi.subprograma,
                nit_compania,
              },
            },
          })
          setCpis((prev) =>
            prev.filter(
              (item) => item.codigo_act !== cpi.codigo_act || item.codigo_ins !== cpi.codigo_ins
            )
          )
        } catch (error) {
          toast.error('Error al eliminar el registro')
          console.error('Error deleting record:', error)
        }
      },
    })
  }

  const handleRemoveCpc = (cpi) => {
    if (!cpi.isNew) {
      handleDeleteQuery(cpi)
      return
    }
    setCpis((prev) =>
      prev.filter(
        (item) => item.codigo_act !== cpi.codigo_act || item.codigo_ins !== cpi.codigo_ins
      )
    )
  }

  const handleChangeValue = (codigo_act, codigo_ins, newValue) => {
    setCpis((prev) =>
      prev.map((item) =>
        item.codigo_act === codigo_act && item.codigo_ins === codigo_ins
          ? { ...item, valor: Number(newValue) }
          : item
      )
    )
  }

  const { saveItems } = useSaveItems({ pushDataForm, nit_compania })

  const handleSave = async () => {
    await saveItems({
      items: cpis,
      setItems: setCpis,
      blockId: 'movpresupuestal_wp',
      mapData: (item) => ({
        valor: +item.valor,
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
        ano: row.ano,
        cpc: row.cpc,
        cpi: row.cpi,
        id_centrocosto: row.id_centrocosto,
        actividad: item.id_actividad,
        insumo: item.id_insumo,
        programa: item.id_programa,
        subprograma: item.id_subprograma,
      }),
      getId: (item) => `${item.id_actividad}-${item.id_insumo}`,
    })
  }

  const query = useQueryForList({
    nit_compania,
    proyecto: row?.proyecto,
    ano: row?.ano,
  })

  return (
    <section className='space-y-4'>
      <BackdropLoading
        loading={deletingRecord}
        sizeLoading={80}
      />
      <CpcHeader onClick={cpiModal.handleShow} />
      <CpcTable
        cpis={cpis}
        onValueChange={handleChangeValue}
        onRemove={handleRemoveCpc}
      />
      <CpcFooter
        total={total}
        onSave={handleSave}
      />
      {cpiModal.show && (
        <ValueListQuery
          show={cpiModal.show}
          handleShow={cpiModal.handleShow}
          handleShowConfirm={cpiModal.handleShow}
          selectedOption={handleClick}
          queryProps={{ lovQuery: query }}
          tableProps={{ columns }}
        />
      )}
    </section>
  )
}

export default Cpi
